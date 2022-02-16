// return json example: // {"datestring":"2022-02-11","open":256.87,"high":258.76,"low":254.73,"close":255.16,"adjustedClose":255.16,"volume":3592116,"name":"MCD"}
export function api<T>(url: string): Promise<T> {
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json() as Promise<T>//<{ data: T }>
      })
    //   .then(data => {
    //       return data.data
    //   })
}

export interface StockPoint {
    datestring: string;
    open: number;
    high: number;
    low: number;
    close: number;
    adjustedClose: number;
    volume: number;
    name: string;
}