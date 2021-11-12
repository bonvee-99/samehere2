import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const LandingImage = () => {
  return (
    <div style={{ width: "60%" }} className="text-center mt-5">
      <h1 className="mb-2">Welcome to Same Here!</h1>
      <p>Post about your experiences and any advice you have</p>
      <h4>Find resources without logging in...</h4>
      <Link to="/resources">
        <Button variant="link">Resources</Button>
      </Link>
      <svg
        width="100%"
        height="100%"
        id="svg"
        viewBox="0 0 1440 600"
        xmlns="http://www.w3.org/2000/svg"
        style={{ borderRadius: "10px 0 0 10px" }}
        class="transition duration-300 ease-in-out delay-150"
      >
        <path
          d="M 0,600 C 0,600 0,150 0,150 C 75.93301435406698,144.3444976076555 151.86602870813397,138.688995215311 234,137 C 316.13397129186603,135.311004784689 404.46889952153106,137.58851674641147 526,137 C 647.5311004784689,136.41148325358853 802.2583732057416,132.9569377990431 903,142 C 1003.7416267942584,151.0430622009569 1050.4976076555024,172.58373205741626 1131,176 C 1211.5023923444976,179.41626794258374 1325.751196172249,164.7081339712919 1440,150 C 1440,150 1440,600 1440,600 Z"
          stroke="none"
          stroke-width="0"
          fill="#04e76266"
          class="transition-all duration-300 ease-in-out delay-150 path-0"
        ></path>
        <path
          d="M 0,600 C 0,600 0,300 0,300 C 89.82775119617227,327.22488038277515 179.65550239234454,354.44976076555025 266,342 C 352.34449760765546,329.55023923444975 435.2057416267942,277.42583732057415 547,280 C 658.7942583732058,282.57416267942585 799.5215311004783,339.84688995215305 913,346 C 1026.4784688995217,352.15311004784695 1112.708133971292,307.18660287081343 1196,291 C 1279.291866028708,274.81339712918657 1359.645933014354,287.4066985645933 1440,300 C 1440,300 1440,600 1440,600 Z"
          stroke="none"
          stroke-width="0"
          fill="#04e76288"
          class="transition-all duration-300 ease-in-out delay-150 path-1"
        ></path>
        <path
          d="M 0,600 C 0,600 0,450 0,450 C 85.72248803827753,441.6363636363636 171.44497607655506,433.2727272727273 261,446 C 350.55502392344494,458.7272727272727 443.9425837320574,492.54545454545456 543,483 C 642.0574162679426,473.45454545454544 746.7846889952152,420.5454545454545 847,403 C 947.2153110047848,385.4545454545455 1042.9186602870814,403.2727272727273 1141,417 C 1239.0813397129186,430.7272727272727 1339.5406698564593,440.3636363636364 1440,450 C 1440,450 1440,600 1440,600 Z"
          stroke="none"
          stroke-width="0"
          fill="#04e762ff"
        ></path>
      </svg>
    </div>
  );
};

export default LandingImage;
