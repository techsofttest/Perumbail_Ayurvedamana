async function test() {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/pages");

    console.log("Status:", res.status);

    const data = await res.json();

    console.log(data);
  } catch (e) {
    console.error(e);
  }
}

test();
