import Head from "next/head";
import { Bar } from 'react-chartjs-2';
import Loading from "@/components/Loading";
import { IoHome } from "react-icons/io5";
import { Chart as ChartJS, CategoryScale, BarElement, Title, Tooltip, Legend, LinearScale } from "chart.js";
import { useEffect, useState } from "react";


export default function Home() {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  // use this on top for render error
  const [blogData, setBlogData] = useState([]);
  // const [projectData, setProjectData] = useState([]);
  // const [photosData, setPhotosData] = useState([]);
  // const [shopData, setShopData] = useState([]);
  const [loading, setLoading] = useState(true);

  // define options within the component schopes

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Blogs created Monthly by Year"
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await fetch("/api/blogs");
          // const responseProject = await fetch("/api/projects");
          // const responseShop = await fetch("/api/shops");
          // const responsePhotos = await fetch("/api/photos");
          const data = await response.json();
          // const dataProject = await responseProject.json();
          // const dataShop = await responseShop.json();
          // const dataPhotos = await responsePhotos.json();

          setBlogData(data);
          // setProjectData(dataProject);
          // setShopData(dataShop);
          // setPhotosData(dataPhotos);
          setLoading(false);//after fetching data loading is false
      }
      catch (error) {
        setLoading(false)
      }
    }
    fetchData(); //call fetch data
  }, [])

  // aggregate data by year and month
  const monthlyData = blogData.filter(dat=>dat.status === "publish").reduce((acc, blog)=>{
      const year = new Date(blog.createdAt).getFullYear();
      const month = new Date(blog.createdAt).getMonth();
      acc[year]= acc[year] || Array(12).fill(0);//initalize array for the year if not exixts
      acc[year][month]++; //increament count for the month
      return acc;
  },{})

   const currentYear = new Date().getFullYear();
   const Years = monthlyData && Object.keys(monthlyData).length > 0 ? Object.keys(monthlyData) : [];
   const labels = [ "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

   const dataSets = Years.map((year)=>({
      label:`${year}`,
      data: monthlyData[year] || Array(12).fill(0), //if no data for a month, default will be 0
      backgroundColor:`rgba(0, 0,0, 0.8)`
   }))

   const data={
    dataSets,
    labels,
   }

  return (

    <>
      <Head>
        <title>Portfolio Backend</title>
        <meta name="description" content="Blog website backend" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* <h1>Site is Live</h1> */}
      <div className="dashboard">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>Admin <span>Dashboard</span></h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <IoHome /><span>/</span><span>Dashboard</span>
          </div>


        </div>
        <div className="topfourcards flex flex-sb">
          <div className="four_card">
            <h2>Total Blogs</h2>
            <span>5</span>
          </div>
          <div className="four_card">
            <h2>Total Projects</h2>
            <span>5</span>
          </div>
          <div className="four_card">
            <h2>Total Products</h2>
            <span>5</span>
          </div>
          <div className="four_card">
            <h2>Gallery Photos</h2>
            <span>5</span>
          </div>
        </div>

        {/* year overview */}
        <div className="year_overview flex flex-sb">
          <div className="leftyearoverview">
            <div className="flex flex-sb">
              <h3>Year Overview</h3>
              <ul className="creative-dots">
                <li className="big-dot"></li>
                <li className="semi-big-dot"></li>
                <li className="medium-dot"></li>
                <li className="semi-medium-dot"></li>
                <li className="semi-small-dot"></li>
                <li className="small-dot"></li>
              </ul>
              <h3 className="text-right">10 / 365 <br /> <span>Total Published</span></h3>
            </div>
            <Bar data={data} options={options} />
          </div>
        </div>
      </div>
    </>

  );



}
