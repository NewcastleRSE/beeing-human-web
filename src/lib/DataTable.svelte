<script>
    import { onMount } from 'svelte';

    let { inputData, tableId = "data-table-container-" + Math.random().toString(36).slice(2, 10) } = $props();

    // builds a table for an array of JSON objects in this format
    //     {
    //     id: 'ch10',
    //     name: 'ch10',
    //     outboundCount: 63,
    //     inboundCount: 56,
    //     internalCount: 32
    //   }

    // This function builds a table from the data
    function buildTable(data) {
        const table = document.createElement("table");
        const header = table.createTHead();
        const headerRow = header.insertRow(0);
        const headers = ["ID", "Chapter", "Outbound", "Inbound", "Internal"];
        headers.forEach((headerText) => {
            const cell = headerRow.insertCell();
            cell.textContent = headerText;
        });
        const body = table.createTBody();
        data.forEach((item) => {
            const row = body.insertRow();
            Object.values(item).forEach((text) => {
                const cell = row.insertCell();
                cell.textContent = text;
            });
        });

        // Add some basic styling
        table.style.width = "100%";
        table.style.borderCollapse = "collapse";
        table.style.marginTop = "20px";
        table.style.fontFamily = "Arial, sans-serif";
        table.style.fontSize = "14px";
        table.style.border = "1px solid #ddd";
        table.querySelectorAll("th, td").forEach((cell) => {
            cell.style.border = "1px solid #ddd";
            cell.style.padding = "8px";
            cell.style.textAlign = "left";
        });
        table.querySelectorAll("th").forEach((cell) => {
            cell.style.backgroundColor = "#f2f2f2";
            cell.style.fontWeight = "bold";
        });


        return table;
    }

    onMount(() => {
        // Check if the inputData is available and has the expected structure
        if (inputData && Array.isArray(inputData)) {
            const table = buildTable(inputData);
            const container = document.getElementById(tableId);
            container.innerHTML = ""; // Clear any existing content
            container.appendChild(table);
        } else {
            console.error("Data is not in the expected format or is missing.");
        }
    });
</script>

<h2 class="h2 my-4">Number of links per chapter</h2>
<div id={tableId}>
    <!-- The table will be inserted here -->
</div>