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