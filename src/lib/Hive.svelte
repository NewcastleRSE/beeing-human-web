<script>
    import Cell from "./Cell.svelte";
    import { shuffle } from "../utils/BuzzwordsHelper";
    import { onMount } from "svelte";

    export let data;
    
    let spotlightArray = []

    onMount(async () => {
      const arrayData = []
      for(const key of Object.keys(data)) {
        arrayData.push(data[key]);
      }
      spotlightArray = shuffle(arrayData);
    });

</script>

{#if spotlightArray.length > 0}
  <div class="hidden md:block w-full mx-auto" data-testid = 'hive-desktop'>
      <div class="grid grid-cols-5 max-w-fit -space-x-6 mx-auto">
        <Cell type="empty" />
        <Cell
          type="article"
          link="{spotlightArray[0]["link"]}"
          backgroundImage="{spotlightArray[0]["image"]}"
          text="{spotlightArray[0]["text"]}"
        />
        <Cell type="empty" />
        <Cell
          type="article"
          link="{spotlightArray[1]["link"]}"
          backgroundImage="{spotlightArray[1]["image"]}"
          text="{spotlightArray[1]["text"]}"
        />
        <Cell type="empty" />
      </div>
    
      <div class="grid grid-cols-5 max-w-fit -mt-14 -space-x-6 mx-auto">
        <Cell type="empty" />
        <Cell type="empty" />
        <Cell
          type="section"
          link="connections"
          backgroundImage="assets/galina-nelyubova-5RHW2DSBx3o-unsplash.jpg?url"
          testid = 'connections-desktop'/>
        <Cell type="empty" />
        <Cell type="empty" />
      </div>
    
      <div class="grid grid-cols-5 max-w-fit -mt-14 -space-x-6 mx-auto">
        <Cell type="empty" />
        <Cell
          type="article"
          link="{spotlightArray[2]["link"]}"
          backgroundImage="{spotlightArray[2]["image"]}"
          text="{spotlightArray[2]["text"]}"
        />
        <Cell type="empty" />
        <Cell
        type="article"
        link="{spotlightArray[3]["link"]}"
        backgroundImage="{spotlightArray[3]["image"]}"
        text="{spotlightArray[3]["text"]}"
        />
        <Cell type="empty" />
      </div>

      <div class="grid grid-cols-5 max-w-fit -mt-14 -space-x-16 mx-auto">
        <Cell
        type="article"
        link="{spotlightArray[4]["link"]}"
        backgroundImage="{spotlightArray[4]["image"]}"
        text="{spotlightArray[4]["text"]}"
        />
          <Cell type="empty"/>
          <Cell type="empty"/>
          <Cell type="empty"/>
          <Cell type="section" link="music" backgroundImage="assets/music_page.jpg" testid = 'music-desktop'/>
        </div>
    
      <div class="grid grid-cols-5 max-w-fit -mt-14 -space-x-6 mx-auto">
        <Cell type="empty" />
        <Cell type="section" link="science" backgroundImage="assets/national-cancer-institute-bwMhq_itmMU-unsplash.jpg" testid = 'science-desktop'/>
        <Cell type="empty" />
        <Cell
        type="article"
        link="{spotlightArray[5]["link"]}"
        backgroundImage="{spotlightArray[5]["image"]}"
        text="{spotlightArray[5]["text"]}"
        />
        <Cell type="empty" />
      </div>
    
      <div class="grid grid-cols-5 max-w-fit -mt-14 -space-x-6 mx-auto">
        <Cell type="empty" />
        <Cell type="empty" />
        <Cell type="empty" />
        <Cell type="empty" />
        <Cell
        type="article"
        link="{spotlightArray[6]["link"]}"
        backgroundImage="{spotlightArray[6]["image"]}"
        text="{spotlightArray[6]["text"]}"
        />
      </div>
    
      <div class="grid grid-cols-5 max-w-fit -mt-14 -space-x-6 mx-auto">
        <Cell type="empty" />
        <Cell type="empty" />
        <Cell type="empty" />
        <Cell
          type="section"
          link="literature"
          backgroundImage="assets/titlepage.jpg"
          testid = 'literature-desktop'
        />
        <Cell type="empty" />
      </div>
  </div>

  <div class="md:hidden w-full mx-auto" data-testid="hive-mobile">
      <div class="grid grid-cols-2 max-w-fit -space-x-8 mx-auto">
          <Cell type="empty" />
          <Cell
            type="article"
            link={spotlightArray[0].link}
            backgroundImage={spotlightArray[0].image}
            text={spotlightArray[0].text}
          />
        </div>
      
        <div class="grid grid-cols-2 max-w-fit -mt-14 -space-x-8 mx-auto">
          <Cell
            type="section"
            link="literature"
            backgroundImage="assets/titlepage.jpg"
            testid = 'literature-mobile'
          />
          <Cell type="empty" />
        </div>
      
        <div class="grid grid-cols-2 max-w-fit -mt-14 -space-x-8 mx-auto">
          <Cell type="empty" />
          <Cell
            type="section"
            link="music"
            backgroundImage="assets/music_page.jpg"
            testid = 'music-mobile'
          />
        </div>
      
        <div class="grid grid-cols-2 max-w-fit -mt-14 -space-x-8 mx-auto">
          <Cell
            type="section"
            link="connections"
            backgroundImage="assets/galina-nelyubova-5RHW2DSBx3o-unsplash.jpg?url"
            testid = 'connections-mobile'
          />
          <Cell type="empty" />
        </div>
      
        <div class="grid grid-cols-2 max-w-fit -space-x-8 mx-auto">
          <Cell type="empty" />
          <Cell type="empty" />
        </div>
      
        <div class="grid grid-cols-2 max-w-fit -space-x-8 mx-auto">
          <Cell
            type="section"
            link="science"
            backgroundImage="assets/national-cancer-institute-bwMhq_itmMU-unsplash.jpg"
            testid = 'science-mobile'
          />
        </div>
      
        <div class="grid grid-cols-2 max-w-fit -mt-14 -space-x-8 mx-auto">
          <Cell type="empty" />
          <Cell
            type="article"
            link={spotlightArray[1].link}
            backgroundImage={spotlightArray[1].image}
            text={spotlightArray[1].text}
          />
        </div>
  </div>
{/if}