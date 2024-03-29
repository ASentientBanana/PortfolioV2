import * as React from "react"
const SvgComponent = (props: any) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fillRule="evenodd"
        clipRule="evenodd"
        {...props}
    >
        <path d="M22 24H2V0h14l6 6v18zM15 1H3v22h18V7h-6V1zm3 15v1H6v-1h12zm0-3v1H6v-1h12zm0-3v1H6v-1h12zm-2-4h4.586L16 1.414V6z" />
    </svg>
)
export default SvgComponent
