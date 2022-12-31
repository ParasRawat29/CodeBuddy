import React from "react";

function UserIcon({ width, height, ...rest }) {
  return (
    <div
      style={{ width, height, display: "inline", cursor: "pointer" }}
      {...rest}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 64 66"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M32.0002 5.5C24.9556 5.59265 18.2249 8.5197 13.2433 13.657C8.26169 18.7943 5.42333 25.7353 5.3335 33C5.36643 37.232 6.34608 41.3991 8.19619 45.1768C10.0463 48.9545 12.7169 52.2408 16.0002 54.78V55H16.2668C20.782 58.5681 26.3118 60.5018 32.0002 60.5018C37.6886 60.5018 43.2183 58.5681 47.7335 55H48.0002V54.78C51.2834 52.2408 53.954 48.9545 55.8041 45.1768C57.6542 41.3991 58.6339 37.232 58.6668 33C58.577 25.7353 55.7386 18.7943 50.757 13.657C45.7754 8.5197 39.0447 5.59265 32.0002 5.5ZM21.5202 52.0575C21.9095 50.219 22.8966 48.5729 24.3177 47.3925C25.7389 46.212 27.5087 45.5681 29.3335 45.5675H34.6668C36.4917 45.5681 38.2614 46.212 39.6826 47.3925C41.1038 48.5729 42.0909 50.219 42.4802 52.0575C39.3038 53.9847 35.6855 55.001 32.0002 55.001C28.3148 55.001 24.6965 53.9847 21.5202 52.0575ZM46.9602 48.51C45.9458 46.0101 44.2378 43.875 42.0506 42.373C39.8634 40.8709 37.2946 40.0689 34.6668 40.0675H29.3335C26.7057 40.0689 24.1369 40.8709 21.9497 42.373C19.7625 43.875 18.0545 46.0101 17.0402 48.51C15.0419 46.4832 13.4506 44.0703 12.357 41.409C11.2634 38.7477 10.6891 35.8903 10.6668 33C10.736 27.1874 13.0058 21.633 16.9917 17.5225C20.9776 13.4121 26.3637 11.0713 32.0002 11C37.6366 11.0713 43.0227 13.4121 47.0086 17.5225C50.9945 21.633 53.2643 27.1874 53.3335 33C53.3112 35.8903 52.7369 38.7477 51.6433 41.409C50.5498 44.0703 48.9584 46.4832 46.9602 48.51Z"
          fill="#FEFEFE"
        />
        <path
          d="M32.0001 16.5C30.5903 16.4661 29.1886 16.7275 27.8796 17.2683C26.5706 17.8091 25.3816 18.6181 24.3845 19.6464C23.3874 20.6747 22.6029 21.9008 22.0784 23.2507C21.554 24.6006 21.3006 26.0462 21.3334 27.5C21.3006 28.9538 21.554 30.3994 22.0784 31.7492C22.6029 33.0991 23.3874 34.3253 24.3845 35.3536C25.3816 36.3818 26.5706 37.1908 27.8796 37.7317C29.1886 38.2725 30.5903 38.5339 32.0001 38.5C33.4098 38.5339 34.8116 38.2725 36.1206 37.7317C37.4295 37.1908 38.6185 36.3818 39.6157 35.3536C40.6128 34.3253 41.3973 33.0991 41.9217 31.7492C42.4461 30.3994 42.6996 28.9538 42.6667 27.5C42.6996 26.0462 42.4461 24.6006 41.9217 23.2507C41.3973 21.9008 40.6128 20.6747 39.6157 19.6464C38.6185 18.6181 37.4295 17.8091 36.1206 17.2683C34.8116 16.7275 33.4098 16.4661 32.0001 16.5ZM32.0001 33C31.2906 33.0354 30.5818 32.9173 29.9192 32.6534C29.2566 32.3895 28.6548 31.9856 28.1526 31.4677C27.6503 30.9497 27.2587 30.3292 27.0028 29.6459C26.7469 28.9626 26.6324 28.2316 26.6667 27.5C26.6324 26.7683 26.7469 26.0374 27.0028 25.3541C27.2587 24.6708 27.6503 24.0502 28.1526 23.5323C28.6548 23.0143 29.2566 22.6104 29.9192 22.3466C30.5818 22.0827 31.2906 21.9646 32.0001 22C32.7095 21.9646 33.4183 22.0827 34.0809 22.3466C34.7435 22.6104 35.3453 23.0143 35.8475 23.5323C36.3498 24.0502 36.7414 24.6708 36.9973 25.3541C37.2532 26.0374 37.3677 26.7683 37.3334 27.5C37.3677 28.2316 37.2532 28.9626 36.9973 29.6459C36.7414 30.3292 36.3498 30.9497 35.8475 31.4677C35.3453 31.9856 34.7435 32.3895 34.0809 32.6534C33.4183 32.9173 32.7095 33.0354 32.0001 33Z"
          fill="#FEFEFE"
        />
      </svg>
    </div>
  );
}

export default UserIcon;