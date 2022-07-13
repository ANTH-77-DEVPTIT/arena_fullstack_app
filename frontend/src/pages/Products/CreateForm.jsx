import { Stack } from '@shopify/polaris'
import React, { useState } from 'react'
import AppHeader from '../../components/AppHeader'

const initialFormData = {
  title: {
    type: 'text',
    label: 'Title',
    value:'',
    error: '',
    required: true,
    validate: {
      trim: true,
      required: [true, 'Required'],
      minlength: [2, 'Too Short'],
      maxlength: [100, 'Too Long']
    },
    autoFocus: true
  },
  description: {
    type: 'text',
    label: "Description",
    value: '',
    error: '',
    required: true,
    validate: {
      trim: true,
      required: [true, 'Required'],
      minlength: [1, 'Too Short'],
      maxlength: [255, "Too Long"],
    }
  },
  price: {
    type: "number",
    label: "Price",
    value: "",
    error: '',
    required: true,
    validate: {
      trim: true,
      required: [true, 'Required'],
      minlength: [1, "Too Short"],
      maxlength: [1000000, 'Too Long']
    }
  },
  handle: {

  },
  publish: {
    type: 'bool',
  },
  status: {

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
    options: [{label: "Select a vendor", value: ''}]
  },
  
}

function CreateForm(props) {
  const { actions, created, onDiscard, onSubmit } = props

  const [formData, setFormData] = useState()
  return (
    <Stack>
      <Stack.Item>
        <AppHeader title={created.id ? 'Edit Product' : 'Add Product' } onBack={onDiscard}/>
      </Stack.Item>

      <Stack.Item>HIHI</Stack.Item>
      <Stack.Item>HIHI</Stack.Item>
    </Stack>
  )
}

export default CreateForm