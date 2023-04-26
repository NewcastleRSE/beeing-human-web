<script>
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
  // import ContentEditable from './lib/ConEditable.svelte';
  // import NumericInput from './lib/NumericInput.svelte';
  // import HelloWorld from './lib/HelloWorld.svelte';
  // import Logo from './lib/Logo.svelte';
  // import Paragraph from './lib/Paragraph.svelte';
  // import NewCounter from './lib/NewCounter.svelte';
  // import AddNumber from './lib/AddNumber.svelte';
  // import Exported from './lib/Exported.svelte';
  // import ObjectProperties from './lib/ObjectProperties.svelte';
  // import Conditional from './lib/Conditional.svelte';
  // import NestedConditional from './lib/NestedConditional.svelte';
  // import LoopData from './lib/LoopData.svelte';
  // import KeyedBlock from './lib/KeyedBlock.svelte';
  // import Await from './lib/Await.svelte';
  // import MouseEvent from './lib/MouseEvent.svelte';
  // import MouseEventInline from './lib/MouseEventInline.svelte';
  // import EventModifier from './lib/EventModifier.svelte';
  // import EventDispatcher from './lib/EventDispatcher.svelte';
  // import EventForwarding from './lib/EventForwarding.svelte';
  // import DomForward from './lib/DomForward.svelte';
  // import TextInputBinding from './lib/TextInputBinding.svelte';
  // import CheckboxInput from './lib/CheckboxInput.svelte';
  // import GroupInputs from './lib/GroupInputs.svelte';
  // import TextAreaInput from './lib/TextAreaInput.svelte';
  // import SelectBindings from './lib/SelectBindings.svelte';
  // import ConEditable from './lib/ConEditable.svelte';
  // import EachBlockBind from './lib/EachBlockBind.svelte';
  // import MediaBind from './lib/MediaBind.svelte';
  // import DimensionsBind from './lib/DimensionsBind.svelte';
  // import ThisBinding from './lib/ThisBinding.svelte';
  // import ComponentBinding from './lib/ComponentBinding.svelte';
  // import CompInstanceBind from './lib/CompInstanceBind.svelte';
  // import CompOnDestroy from './lib/CompOnDestroy.svelte';
  // import Eliza from './lib/Eliza.svelte';
  // import Tick from './lib/Tick.svelte';
  // import WritableStore from './lib/WritableStore.svelte';
  // import ReadableStore from './lib/ReadableStore.svelte';
  // import CustomStores from './lib/CustomStores.svelte';
  // import StoreBinding from './lib/StoreBinding.svelte';
  import MotionTweened from './lib/MotionTweened.svelte';
</script>

<main>
  <!-- <HelloWorld /> -->
  <!-- <Logo/> -->
  <!-- <Paragraph/> -->
  <!-- <NewCounter/> -->
  <!-- <AddNumber/> -->
  <!-- <Exported answer={"42+1"}/> -->
  <!-- <Exported/> -->
  <!-- <ObjectProperties/> -->
  <!-- <Conditional></Conditional> -->
  <!-- <NestedConditional/> -->
  <!-- <LoopData/> -->
  <!-- <KeyedBlock/> -->
  <!-- <Await/> -->
  <!-- <MouseEvent/> -->
  <!-- <MouseEventInline/> -->
  <!-- <EventModifier/> -->
  <!-- <EventDispatcher/> -->
  <!-- <EventForwarding/> -->
  <!-- <DomForward/> -->
  <!-- <TextInputBinding/> -->
  <!-- <NumericInput/> -->
  <!-- <CheckboxInput/> -->
  <!-- <GroupInputs/> -->
  <!-- <TextAreaInput/> -->
  <!-- <SelectBindings/> -->
  <!-- <ConEditable/> -->
  <!-- <EachBlockBind/> -->
  <!-- <MediaBind/> -->
  <!-- <DimensionsBind/> -->
  <!-- <ThisBinding/> -->
  <!-- <ComponentBinding/> -->
  <!-- <CompInstanceBind/> -->
  <!-- <CompOnDestroy/> -->
  <!-- <Eliza/> -->
  <!-- <Tick/> -->
  <!-- <WritableStore/> -->
  <!-- <ReadableStore/> -->
  <!-- <CustomStores/> -->
  <!-- <StoreBinding/> -->
  <MotionTweened/>
  <div>
    <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  <h1>Vite + Svelte</h1>

  <div class="card">
    <Counter />
  </div>

  <p>
    Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank" rel="noreferrer">SvelteKit</a>, the official Svelte app framework powered by Vite!
  </p>

  <p class="read-the-docs">
    Click on the Vite and Svelte logos to learn more
  </p>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
