import PropTypes from 'prop-types'
import { Button, Card, Select, Stack } from '@shopify/polaris'
import React, { useCallback, useEffect, useState } from 'react'
import AppHeader from '../../components/AppHeader'
import FormControl from '../../components/FormControl'
import FormValidate from '../../helpers/formValidate'

CreateForm.propTypes = {
  created: PropTypes.object,
  onDiscard: PropTypes.func,
  onSubmit: PropTypes.func,
  vendors: PropTypes.array,
}

CreateForm.defaultProps = {
  created: {},
  onDiscard: () => null,
  onSubmit: () => null,
  vendors: [],
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
    type: 'text',
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
  handle: {
    type: 'text',
    label: 'Handle',
    value: '',
    error: '',
    required: true,
    validate: {
      trim: true,
      required: [true, 'Required'],
      minlength: [2, 'Too Short'],
      maxlength: [30, 'Too Long'],
    },
  },
  publish: {
    type: 'radio',
    label: 'Publish',
    value: false,
    error: '',
    validate: {},
    options: [
      {
        label: 'Publish',
        value: true,
      },
      {
        label: 'Private',
        value: false,
      },
    ],
  },
  status: {
    type: 'select',
    label: 'Status',
    value: false,
    error: '',
    validate: {},
    options: [
      {
        label: 'Active',
        value: 'ACTIVE',
      },
      {
        label: 'DRAFT',
        value: 'DRAFT',
      },
      {
        label: 'ARCHIVED',
        value: 'ARCHIVED',
      },
    ],
  },
  vendorId: {
    type: 'select',
    label: 'Vendor',
    value: '',
    error: '',
    validate: {},
    options: [{ label: 'Select a vendor', value: '' }],
  },
  thumbnail: {
    type: 'file',
    label: 'Thumbnail',
    value: null,
    error: '',
    validate: {},
    allowMultiple: false,
  },
  images: {
    type: 'file',
    label: 'Images',
    value: [],
    error: '',
    validate: {},
    allowMultiple: true,
  },
}

function CreateForm(props) {
  const { actions, created, onDiscard, onSubmit, vendors } = props

  const [formData, setFormData] = useState(initialFormData)
  const [vendor, setVendor] = useState(formData.vendorId.options[1])

  const handleSelectVendorChange = useCallback((value) => setVendor(value), [])

  useEffect(() => {
    const _formData = JSON.parse(JSON.stringify(formData))

    _formData.title.value = 'pr01'
    _formData.description.value = 'pr01'
    _formData.price.value = '1200'
    _formData.handle.value = 'different'
    // _formData.vendorId.value = '1'
    // _formData.status.value = 'ACTIVE'

    const vendorOptions = vendors.map((vendor) => ({ label: vendor.name, value: '' + vendor.id }))

    vendorOptions.unshift({ label: 'Select a vendor', value: '' })

    _formData.vendorId.options = vendorOptions

    setFormData(_formData)
  }, [])

  const handleChange = (name, value) => {
    let _formData = JSON.parse(JSON.stringify(formData))
    Array.from(['thumbnail', 'images']).forEach((key) => (_formData[key] = formData[key]))

    // rest operator: lay ra tat ca cac thang con lai
    // spread: clone array hay obj ra va ghi gia tri moi vao
    _formData[name] = { ..._formData[name], value, error: '' }
    setFormData(_formData)
  }

  const handleSubmit = () => {
    try {
      const { valid, data } = FormValidate.validateForm(formData)

      if (valid) {
        data['thumbnail'].value = formData['thumbnail'].value
        data['images'].value = formData['images'].value

        console.log(data)
        onSubmit(data)
      } else {
        setFormData(data)
        throw new Error('Invalid form data')
      }
    } catch (error) {
      console.log(error)
      actions.showNotify({ error: true, message: error.message })
    }
  }

  return (
    <Stack vertical alignment="fill">
      <Stack.Item>
        <AppHeader title={created.id ? 'Edit user' : 'Add product'} onBack={onDiscard} />
      </Stack.Item>

      <Stack.Item>
        <Card sectioned>
          <Stack vertical alignment="fill">
            <Stack.Item>
              <Stack>
                <Stack.Item fill>
                  <FormControl
                    {...formData['title']}
                    onChange={(value) => handleChange('title', value)}
                  />
                </Stack.Item>
                <Stack.Item fill>
                  <FormControl
                    {...formData['description']}
                    onChange={(value) => handleChange('description', value)}
                  />
                </Stack.Item>
              </Stack>
            </Stack.Item>

            <Stack.Item>
              <Stack>
                <Stack.Item fill>
                  <FormControl
                    {...formData['handle']}
                    onChange={(value) => handleChange('handle', value)}
                  />
                </Stack.Item>
                <Stack.Item fill>
                  <FormControl
                    {...formData['price']}
                    onChange={(value) => handleChange('price', value)}
                  />
                </Stack.Item>
              </Stack>
            </Stack.Item>

            <Stack.Item>
              <Stack>
                <Stack.Item>
                  <FormControl
                    {...formData['publish']}
                    onChange={(value) => handleChange('publish', value)}
                  />
                </Stack.Item>
                <Stack.Item fill>
                  <FormControl
                    {...formData['status']}
                    onChange={(value) => handleChange('status', value)}
                  />
                </Stack.Item>
              </Stack>
            </Stack.Item>

            <Stack.Item>
              <Stack>
                <Stack.Item fill>
                  <FormControl
                    {...formData['vendorId']}
                    onChange={(value) => handleChange('vendorId', value)}
                  />
                </Stack.Item>
              </Stack>
            </Stack.Item>

            <Stack.Item>
              <Stack>
                <Stack.Item fill>
                  <FormControl
                    {...formData['thumbnail']}
                    onChange={(value) => handleChange('thumbnail', value)}
                  />
                </Stack.Item>
                <Stack.Item fill>
                  <FormControl
                    {...formData['images']}
                    onChange={(value) => handleChange('images', value)}
                  />
                </Stack.Item>
              </Stack>
            </Stack.Item>
          </Stack>
        </Card>
      </Stack.Item>

      <Stack.Item>
        <Stack distribution="trailing">
          <Button onClick={onDiscard}>Discard</Button>
          <Button primary onClick={handleSubmit}>
            {created.id ? 'Save' : 'Add Product'}
          </Button>
        </Stack>
      </Stack.Item>
    </Stack>
  )
}

export default CreateForm
