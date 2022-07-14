import PropTypes from 'prop-types'
import { Button, Card, Select, Stack } from '@shopify/polaris'
import React, { useCallback, useEffect, useState } from 'react'
import AppHeader from '../../components/AppHeader'
import FormControl from '../../components/FormControl'

CreateForm.propTypes = {
  created: PropTypes.object,
  onDiscard: PropTypes.func,
  onSubmit: PropTypes.func,
}

CreateForm.defaultProps = {
  created: {},
  onDiscard: () => null,
  onSubmit: () => null,
}

const initialFormData = {
  title: {
    type: 'text',
    label: 'Title',
    value: '',
    error: '',
    required: true,
    validate: {
      trim: true,
      required: [true, 'Required'],
      minlength: [2, 'Too Short'],
      maxlength: [100, 'Too Long'],
    },
    autoFocus: true,
  },
  description: {
    type: 'text',
    label: 'Description',
    value: '',
    error: '',
    required: true,
    validate: {
      trim: true,
      required: [true, 'Required'],
      minlength: [1, 'Too Short'],
      maxlength: [255, 'Too Long'],
    },
  },
  price: {
    type: 'number',
    label: 'Price',
    value: '',
    error: '',
    required: true,
    validate: {
      trim: true,
      required: [true, 'Required'],
      minlength: [1, 'Too Short'],
      maxlength: [1000000, 'Too Long'],
    },
  },
  // handle: {
  //   type: '',
  // },
  // publish: {
  //   type: 'bool',
  // },
  status: {
    type: 'select',
    label: 'Status',
    error: '',
    required: true,
    validate: {},
    option: [{ label: 'Select a status', value: '' }],
  },
  thumbnail: {
    type: 'file',
    label: 'Avatar',
    value: '',
    error: '',
    validate: {},
    allowMultiple: false,
  },
  images: {
    type: 'file',
    label: 'Images',
    value: '',
    error: '',
    validate: {},
    allowMultiple: true,
  },
  vendorId: {
    type: 'select',
    label: 'Vendor',
    value: '',
    error: '',
    validate: {},
    options: [{ label: 'Select a vendor', value: '' }],
  },
}

function CreateForm(props) {
  const { actions, created, onDiscard, onSubmit, vendors } = props

  const [formData, setFormData] = useState(initialFormData)

  const [selected, setSelected] = useState(formData.vendorId.options[1])

  const handleSelectChange = useCallback((value) => setSelected(value), [])

  useEffect(() => {
    const _formData = JSON.parse(JSON.stringify(formData))

    _formData.title.value = 'hung an'
    _formData.description.value = 'hung an'
    _formData.price.value = '1200'
    // _formData.handle.value = 'p02'

    const vendorOptions = vendors.map((vendor) => ({ label: vendor.name, value: '' + vendor.id }))

    vendorOptions.unshift({ label: 'Select a vendor', value: '' })

    _formData.vendorId.options = vendorOptions

    setFormData(_formData)
  }, [])

  return (
    <Stack vertical alignment="fill">
      <Stack.Item>
        <AppHeader title={created.id ? 'Edit Product' : 'Add Product'} onBack={onDiscard} />
      </Stack.Item>

      {/* <Stack.Item>
        <Select
          options={formData.vendorId.options}
          onChange={handleSelectChange}
          value={selected}
        />
      </Stack.Item> */}
      <Stack.Item>
        <Card sectioned>
          <Stack vertical alignment="fill">
            <Stack>
              <Stack.Item fill>
                <FormControl {...formData['title']} />
              </Stack.Item>
              <Stack.Item fill>
                <FormControl {...formData['description']} />
              </Stack.Item>
            </Stack>

            <Stack>
              <Stack.Item fill>
                <FormControl {...formData['price']} />
              </Stack.Item>
            </Stack>

            <Stack>
              <Stack.Item fill>
                <Select
                  options={formData.vendorId.options}
                  onChange={handleSelectChange}
                  value={selected}
                />
              </Stack.Item>
            </Stack>

            {/* <Stack>
              <Stack.Item fill>
                <FormControl {...formData['thumbnail']} />
              </Stack.Item>
              <Stack.Item fill>
                <FormControl {...formData['images']} />
              </Stack.Item>
            </Stack> */}
          </Stack>
        </Card>
      </Stack.Item>

      <Stack.Item>
        <Stack distribution="trailing">
          <Button>Discard</Button>
          <Button primary>{created.id ? 'Save' : 'Add user'}</Button>
        </Stack>
      </Stack.Item>
    </Stack>
  )
}

export default CreateForm
