async function test() {
  const url = "https://uuuayeqngdqkmpipqwzd.supabase.co/rest/v1/states?select=*"
  const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1dWF5ZXFuZ2Rxa21waXBxd3pkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMDk5NjUsImV4cCI6MjA5MTU4NTk2NX0.IulBvbJKt9s-2ZrtrHV219Sw1tn-OGphwOvsnUPMR7g"
  
  try {
    console.log("Fetching from:", url)
    const res = await fetch(url, {
      headers: {
        "apikey": key,
        "Authorization": `Bearer ${key}`
      }
    })
    console.log("Status:", res.status)
    const data = await res.json()
    console.log("Data sample:", JSON.stringify(data).substring(0, 100))
  } catch (e) {
    console.error("Fetch Error:", e)
  }
}

test()
