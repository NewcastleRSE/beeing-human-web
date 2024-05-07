export async function load({fetch}) {
    // This load function needs to be in the +layout.server.js so that the data is also available to /buzzwords
    

    let response = await fetch('/api/buzzwords');
    let buzzwordData = await response.json();

    // turns date string into date object
    for (const buzz of buzzwordData.buzzwords) {
      buzz.date = new Date(buzz.date);
    }


    return {...buzzwordData}
}