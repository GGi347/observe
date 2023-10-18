import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    :root {
    --color-grey-0: #fff;
    --color-grey-10: #f0f0f0;
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
  --primary-color: #6262e6;
  --table-border-color: #dccdcd;
    }

    @font-face {
        font-family: Roboto-Regular;
        src: url('../fonts/Roboto-Regular.ttf');
    }

    /* @font-face {
        font-family: Roboto-Medium;
        src: url('../fonts/Roboto-Medium.ttf');
    }

    @font-face {
        font-family: Roboto-Bold;
        src: url('../fonts/Roboto-Bold.ttf');
    }*/

    @font-face {
        font-family: Inter;
        src: url('../fonts/Inter-Regular.ttf');
    } 

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Inter, sans-serif;
        
    }

    #root {
        width: 100%;
        min-width: 200px;
    }

    li {
        list-style-type: none;
    }

    img {
        width: 100%;
    }
    th {
        border: 1px solid var(--table-border-color);
    }

    td {
        border: 1.2px solid var(--color-grey-10);
    }

    th, td {
    
        width: 2rem;
        height: 2.4rem;
        font-size: 1rem;
        text-align: center;
       
    }

    body{
        width: 100%;
    }


`;

export default GlobalStyles;
