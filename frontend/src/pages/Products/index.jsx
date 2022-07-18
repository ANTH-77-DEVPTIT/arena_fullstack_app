import { Card, Stack } from '@shopify/polaris'
import { useState, useEffect } from 'react'
import ProductApi from '../../api/product'
import VendorApi from '../../api/vendor'
import AppHeader from '../../components/AppHeader/index.jsx'
import MyPagination from '../../components/MyPagination'
import PagePreloader from '../../components/PagePreloader'
import ConfirmDelete from './ConfirmDelete'
import CreateForm from './CreateForm'
import ProductList from './ProductList'

function ProductsPage(props) {
  const { actions } = props

  const [isReady, setIsReady] = useState(false)
  const [products, setProducts] = useState(null)
  const [vendors, setVendors] = useState(null)
  const [created, setCreated] = useState(null)
  const [deleted, setDeleted] = useState(null)

  const getProducts = async ({ page, limit }) => {
    try {
      let res = await ProductApi.find({ page, limit })
      if (!res.success) {
        throw res.error
      }

      setProducts(res.data)
    } catch (error) {
      console.log(error)
    } finally {
    }
  }

  const getVendors = async () => {
    try {
      actions.showAppLoading()

      let res = await VendorApi.find()

      if (!res.success) {
        throw res.error
      }

      setVendors(res.data)
    } catch (error) {
      console.log(error)
      actions.showNotify({ error: true, message: error.message })
    } finally {
      actions.hideAppLoading()
    }
  }

  useEffect(() => {
    getProducts({})
    getVendors({})
  }, [])

  useEffect(() => {
    if (!isReady && products && vendors) {
      //isReady ===true, co thong tin cua users and countries thi moi thuc hien
      setIsReady(true)
    }
  })

  const handleSubmit = async (formData) => {
    try {
      actions.showAppLoading()

      let data = {}
      Object.keys(formData).forEach((key) =>
        formData[key].value ? (data[key] = formData[key].value) : null,
      )
      let res = null

      if (created?.id) {
        res = await ProductApi.update(created.id, data)
        // console.log('data :>> ', data)
      } else {
        res = await ProductApi.create(data)
      }

      if (!res.success) {
        throw res.error
      }

      actions.showNotify({ message: created?.id ? 'Saved' : 'Added' })

      setCreated(null)
      getProducts({})
    } catch (error) {
      console.log(error)
      actions.showNotify({ error: true, message: error.message })
    } finally {
      actions.hideAppLoading()
    }
  }

  const handleDelete = async () => {
    try {
      actions.showAppLoading()

      let res = await ProductApi.delete(deleted.id)

      if (!res.success) {
        throw res.error
      }

      actions.showNotify({ message: 'Deleted' })

      setDeleted(null)
      getProducts({ page: products.page, limit: products.limit })
    } catch (error) {
      console.log(error)
      actions.showNotify({ message: error.message, error: true })
    } finally {
      actions.hideNotify()
    }
  }

  if (!isReady) {
    return <PagePreloader />
  }
  console.log('products', products)

  if (created) {
    return (
      <CreateForm
        {...props}
        created={created}
        onDiscard={() => setCreated(null)}
        onSubmit={handleSubmit}
        vendors={vendors}
      />
    )
  }

  return (
    <>
      <Stack vertical alignment="fill">
        <Stack.Item>
          <AppHeader
            title="Products"
            actions={[
              {
                label: 'Add Products',
                primary: true,
                onClick: () => setCreated({}),
              },
            ]}
          />
        </Stack.Item>

        <Stack.Item>
          <Card sectioned>
            <Stack vertical fill>
              <Stack.Item>
                <div>
                  Total items: <b>{products?.totalItems}</b>
                </div>
              </Stack.Item>
              <Stack.Item>
                <ProductList
                  {...props}
                  products={products}
                  onEdit={(item) => setCreated(item)}
                  onDelete={(item) => setDeleted(item)}
                />
              </Stack.Item>
              <Stack.Item>
                <MyPagination
                  page={products.page}
                  limit={products.limit}
                  totalPages={products.totalPages}
                  onChange={({ page, limit }) => getProducts({ page, limit })}
                />
              </Stack.Item>
            </Stack>
          </Card>
        </Stack.Item>
      </Stack>
      {deleted && <ConfirmDelete onDiscard={() => setDeleted(null)} onSubmit={handleDelete} />}
    </>
  )
}

export default ProductsPage
