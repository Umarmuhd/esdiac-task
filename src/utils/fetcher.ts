export default function fetcher(url: string, data = undefined) {
  return fetch(`${window.location.origin}/api${url}`, {
    method: data ? "POST" : "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res.status > 399 || res.status < 200) {
      const err = await res.json();
      console.log(err);

      throw new Error(err.message || "Something went wrong");
    }
    return res.json();
  });
}
