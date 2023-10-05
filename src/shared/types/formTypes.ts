export interface QuoteData {
    docs: {
        map(arg0: (data: any) => JSX.Element): string | number | boolean | {} | import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | import("react").ReactNodeArray | import("react").ReactPortal | null | undefined
        id: string
        uid: string
        date: string
        activitystatus: string
    }
}

export interface RepairData {
    docs: {
        map(arg0: (data: any) => JSX.Element): string | number | boolean | {} | import("react").ReactNodeArray | import("react").ReactPortal | import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | null | undefined
        id: string
        uid: string
        date: string
        activitystatus: string
    }
}