<script lang="ts">
  import { _ } from 'svelte-i18n'
  import type { PageData } from './$types'

  import Content from '$lib/components/Content.svelte'
  import LastUpdatedFooter from '$lib/components/LastUpdatedFooter.svelte'
  import Page from '$lib/components/Page.svelte'
  import RichContent from '$lib/components/RichContent.svelte'

  export let data: PageData

  $: date = data.page.date_updated || data.page.date_created || null
</script>

<Page title={$_(data.keys.title)}>
  <Content reader>
    <RichContent html={$_(data.keys.body)} />
  </Content>
  {#if date}
    <LastUpdatedFooter {date} />
  {/if}
</Page>
