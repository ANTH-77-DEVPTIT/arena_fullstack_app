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
      minlength: [1, 'Too Short'],
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
    type: 'radio',
    label: 'Status',
    value: false,
    error: '',
    validate: {},
    options: [
      {
        label: 'Active',
        value: "ACTIVE",
      },
      {
        label: 'DRAFT',
        value: 'DRAFT',
      },
      {
        label: 'ARCHIVED',
        value: 'ARCHIVED'
      }
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

}

function CreateForm(props) {
  const { actions, created, onDiscard, onSubmit, vendors } = props

  const [formData, setFormData] = useState(initialFormData)

  const [vendor, setVendor] = useState(formData.vendorId.options[1])
  const [status, setStatus] = useState(formData.status.options[1])

  const handleSelectVendorChange = useCallback((value) => setVendor(value), [])

  const handleSelectStatusChange = useCallback((value) => setStatus(value), [])
  useEffect(() => {
    const _formData = JSON.parse(JSON.stringify(formData))

    _formData.title.value = 'hung an'
    _formData.description.value = 'hung an'
    _formData.price.value = '1200'
    _formData.handle.value = 'p02'

    const vendorOptions = vendors.map((vendor) => ({ label: vendor.name, value: '' + vendor.id }))

    vendorOptions.unshift({ label: 'Select a vendor', value: '' })

    _formData.vendorId.options = vendorOptions

    setFormData(_formData)
  }, [])

  // const optionsStatus = [
  //   { label: "ACTIVE", value: "ACTIVE" },
  //   { label: "DRAFT", value: "DRAFT" },
  //   { label: "ARCHIVED", value: "ARCHIVED" },
  // ]
  

  return (
    <Stack vertical alignment="fill">
      <Stack.Item>
        <AppHeader title={created.id ? 'Edit user' : 'Add product'} onBack={onDiscard} />
      </Stack.Item>

      
      <Stack.Item>
        <Card sectioned>
          <Stack vertical alignment='fill'>
            <Stack.Item>
              <Stack>
                <Stack.Item fill>
                  <FormControl 
                    {...formData['title']}
                  />
                </Stack.Item>
                <Stack.Item fill>
                  <FormControl 
                    {...formData['description']}
                  />
                </Stack.Item>
              </Stack>
            </Stack.Item>

            <Stack.Item>
              <Stack>
                <Stack.Item fill>
                  <FormControl 
                    {...formData['handle']}
                  />
                </Stack.Item>
                <Stack.Item fill>
                  <FormControl 
                    {...formData['price']}
                  />
                </Stack.Item>
              </Stack>
            </Stack.Item>

            <Stack.Item>
              <Stack>
                <Stack.Item fill>
                  <FormControl 
                    {...formData['publish']}
                  />
                </Stack.Item>
                <Stack.Item fill>
                  <FormControl 
                      {...formData['status']}
                    />
                </Stack.Item>
              </Stack>
            </Stack.Item>

            <Stack.Item>
              <Stack>
                <Stack.Item fill>
                  <Select 
                    {...formData['vendorId']}
                  />
                </Stack.Item>
              </Stack>
            </Stack.Item>

            
          </Stack>
        </Card>
      </Stack.Item>

      
      <Stack.Item>
        <Stack distribution="trailing">
          <Button>Discard</Button>
          <Button primary>
            {created.id ? 'Save' : 'Add Product'}
          </Button>
        </Stack>
      </Stack.Item>
    </Stack>
  )
}

export default CreateForm
