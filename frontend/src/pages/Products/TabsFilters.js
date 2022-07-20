import { Card, Stack, Tabs } from '@shopify/polaris'
import { useState, useCallback } from 'react'

function TabsFilters() {
  const [selected, setSelected] = useState(0)

  const handleTabChange = useCallback((selectedTabIndex) => setSelected(selectedTabIndex), [])

  const tabs = [
    {
      id: 'all-customers-1',
      content: 'All',
      accessibilityLabel: 'All customers',
      panelID: 'all-customers-content-1',
    },
    {
      id: 'accepts-marketing-1',
      content: 'ACTIVE',
      panelID: 'accepts-marketing-content-1',
    },
    {
      id: 'repeat-customers-1',
      content: 'DRAFT',
      panelID: 'repeat-customers-content-1',
    },
    {
      id: 'prospects-1',
      content: 'ARCHIVED',
      panelID: 'prospects-content-1',
    },
  ]

  return (
    <Stack vertical alignment="fill">
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        <Stack.Item fill title={tabs[selected].content}>
          <p>Tab {selected} selected</p>
        </Stack.Item>
      </Tabs>
    </Stack>
  )
}

export default TabsFilters
