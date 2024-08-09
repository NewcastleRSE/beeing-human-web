<script>
    import Cell from "./Cell.svelte";

    export let data;

    console.log(data);

</script>

<div class="hidden md:block w-full mx-auto">
    <div class="grid grid-cols-5 max-w-fit -space-x-6 mx-auto">
      <Cell type="empty" />
      <Cell
        type="article"
        link="{data[0]["link"]}"
        backgroundImage="{data[0]["image"]}"
        text="{data[0]["text"]}"
      />
      <Cell type="empty" />
      <Cell
        type="article"
        link="{data[1]["link"]}"
        backgroundImage="{data[1]["image"]}"
        text="{data[1]["text"]}"
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
      />
      <Cell type="empty" />
      <Cell type="empty" />
    </div>
  
    <div class="grid grid-cols-5 max-w-fit -mt-14 -space-x-6 mx-auto">
      <Cell type="empty" />
      <Cell
        type="article"
        link="{data[2]["link"]}"
        backgroundImage="{data[2]["image"]}"
        text="{data[2]["text"]}"
      />
      <Cell type="empty" />
      <Cell
      type="article"
      link="{data[3]["link"]}"
      backgroundImage="{data[3]["image"]}"
      text="{data[3]["text"]}"
      />
      <Cell type="empty" />
    </div>

    <div class="grid grid-cols-5 max-w-fit -mt-14 -space-x-16 mx-auto">
      <Cell
      type="article"
      link="{data[4]["link"]}"
      backgroundImage="{data[4]["image"]}"
      text="{data[4]["text"]}"
      />
        <Cell type="empty"/>
        <Cell type="empty"/>
        <Cell type="empty"/>
        <Cell type="section" link="music" backgroundImage="assets/music_page.jpg" />
      </div>
   
    <div class="grid grid-cols-5 max-w-fit -mt-14 -space-x-6 mx-auto">
      <Cell type="empty" />
      <Cell type="section" link="science" backgroundImage="assets/national-cancer-institute-bwMhq_itmMU-unsplash.jpg"/>
      <Cell type="empty" />
      <Cell
      type="article"
      link="{data[5]["link"]}"
      backgroundImage="{data[5]["image"]}"
      text="{data[5]["text"]}"
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
      link="{data[6]["link"]}"
      backgroundImage="{data[6]["image"]}"
      text="{data[6]["text"]}"
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
      />
      <Cell type="empty" />
    </div>
</div>

<div class="md:hidden w-full mx-auto">
    <div class="grid grid-cols-2 max-w-fit -space-x-8 mx-auto">
        <Cell type="empty" />
        <Cell
          type="article"
          link="literature"
          backgroundImage="https://picsum.photos/200"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget metus turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;"
        />
      </div>
    
      <div class="grid grid-cols-2 max-w-fit -mt-14 -space-x-8 mx-auto">
        <Cell
          type="section"
          link="literature"
          backgroundImage="https://picsum.photos/200"
        />
        <Cell type="empty" />
      </div>
    
      <div class="grid grid-cols-2 max-w-fit -mt-14 -space-x-8 mx-auto">
        <Cell type="empty" />
        <Cell
          type="section"
          link="music"
          backgroundImage="https://picsum.photos/200"
        />
      </div>
    
      <div class="grid grid-cols-2 max-w-fit -mt-14 -space-x-8 mx-auto">
        <Cell
          type="section"
          link="connections"
          backgroundImage="https://picsum.photos/200"
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
          backgroundImage="https://picsum.photos/200"
        />
      </div>
    
      <div class="grid grid-cols-2 max-w-fit -mt-14 -space-x-8 mx-auto">
        <Cell type="empty" />
        <Cell
        type="article"
        link="literature"
        backgroundImage="https://picsum.photos/200"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget metus turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;"
      />
      </div>
</div>