async function test() {
  try {
    const res = await fetch("https://www.techsoftwebsolutions.com/techsoft/demo/ayurvedamana/public/api/pages");

    console.log("Status:", res.status);

    const data = await res.json();

    console.log(JSON.stringify(data, null, 2));
  } catch (e) {
    console.error(e);
  }
}

test();

