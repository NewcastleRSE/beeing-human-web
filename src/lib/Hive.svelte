<script>
    import Cell from "./Cell.svelte";
</script>

<div class="hidden md:block w-full mx-auto">
    <div class="grid grid-cols-5 max-w-fit -space-x-4 mx-auto">
      <Cell type="empty" />
      <Cell
        type="article"
        link="literature"
        backgroundImage="https://picsum.photos/200"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget metus turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;"
      />
      <Cell type="empty" />
      <Cell
        type="article"
        link="literature"
        backgroundImage="https://picsum.photos/200"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget metus turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;"
      />
      <Cell type="empty" />
    </div>
  
    <div class="grid grid-cols-5 max-w-fit -mt-14 -space-x-4 mx-auto">
      <Cell type="empty" />
      <Cell type="empty" />
      <Cell
        type="section"
        link="connections"
        backgroundImage="https://picsum.photos/200"
      />
      <Cell type="empty" />
      <Cell type="empty" />
    </div>
  
    <div class="grid grid-cols-5 max-w-fit -mt-14 -space-x-4 mx-auto">
      <Cell type="empty" />
      <Cell
        type="article"
        link="literature"
        backgroundImage="https://picsum.photos/200"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget metus turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;"
      />
      <Cell type="empty" />
      <Cell
        type="article"
        link="literature"
        backgroundImage="https://picsum.photos/200"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget metus turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;"
      />
      <Cell type="empty" />
    </div>

    <div class="grid grid-cols-5 max-w-fit -mt-14 -space-x-10 mx-auto">
        <Cell type="section" link="science" backgroundImage="https://picsum.photos/200" />
        <Cell type="empty" />
        <Cell type="empty" />
        <Cell type="empty" />
        <Cell type="section" link="music" backgroundImage="https://picsum.photos/200" />
      </div>
   
    <div class="grid grid-cols-5 max-w-fit -mt-14 -space-x-4 mx-auto">
      <Cell type="empty" />
      <Cell type="empty" />
      <Cell type="empty" />
      <Cell
        type="article"
        link="literature"
        backgroundImage="https://picsum.photos/200"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget metus turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;"
      />
      <Cell type="empty" />
    </div>
  
    <div class="grid grid-cols-5 max-w-fit -mt-14 -space-x-4 mx-auto">
      <Cell type="empty" />
      <Cell type="empty" />
      <Cell type="empty" />
      <Cell type="empty" />
      <Cell
        type="article"
        link="literature"
        backgroundImage="https://picsum.photos/200"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget metus turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;"
      />
    </div>
  
    <div class="grid grid-cols-5 max-w-fit -mt-14 -space-x-4 mx-auto">
      <Cell type="empty" />
      <Cell type="empty" />
      <Cell type="empty" />
      <Cell
        type="section"
        link="literature"
        backgroundImage="https://picsum.photos/200"
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