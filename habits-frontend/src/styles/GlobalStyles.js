import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    :root {
        --color-grey-0: #fff;
  --color-grey-50: #f9fafb;
  --color-grey-100: #f3f4f6;
  --color-grey-200: #e5e7eb;
  --color-grey-300: #d1d5db;
  --color-grey-400: #9ca3af;
  --color-grey-500: #6b7280;
  --color-grey-600: #4b5563;
  --color-grey-700: #374151;
  --color-grey-800: #1f2937;
  --color-grey-900: #111827;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        
    }

    #root {
        width: 100%;
    }

    li {
        list-style-type: none;
    }

    img {
        width: 100%;
    }

    th {
        border: 1px solid black;
    padding: 10px;
    }


`;

export default GlobalStyles;
