
import '../App.css';
import { Webnavbar } from '../Components/Dashboardcomponents/Navbar';
import { Websidebar } from '../Components/Dashboardcomponents/sidebar';
import { Webcard2 } from '../Components/Dashboardcomponents/card2';
import TableWeb from '../Components/Dashboardcomponents/table';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from 'axios'; // Import axios

const TABLE_HEAD = ["FILE ID", "FILE NAME", "STATUS", "CATEGORY", "CREATION DATE", "VIEW FILE"];


function Dashboard() {
  const [allImage, setAllImage] = useState([]);
  const [search, setSearch] = useState('');
  const [FileAddToday, setFileAddToday] = useState('0');
  const [filesAddedThisMonth, setfilesAddedThisMonth] = useState('0')
  const navigate = useNavigate();

  useEffect(() => {
    getImage()
  }, [])

  function getImage() {
    fetch("http://localhost:5000/get-image", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setAllImage(data.data)
        const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const currentMonth = new Date().toLocaleDateString('en-US', { month: 'short' });
        console.log(currentMonth , 'currentMonth')
        let filesAddedToday = 0;
        let filesAddedThisMonth = 0;

        // if (filesAddedToday == " ") {
        //   filesAddedToday = 0
        // }

        for (let i = 0; i < data.data.length; i++) {
          const itemDate = data.data[i].date;
          const thismonth = data.data[i].date.slice(0, 3);
          console.log(thismonth , 'thismonth');
          console.log(itemDate, "itemdate");
          if (currentMonth === thismonth) {
            filesAddedThisMonth++;
            setfilesAddedThisMonth(filesAddedThisMonth)
          }

          console.log(currentDate, "currentdate");
          console.log(itemDate, "itemDate");
          if (itemDate.includes(currentDate)) {
            filesAddedToday++;
            setFileAddToday(filesAddedToday)
          }
        }
        console.log("Files added today:", filesAddedToday);
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  }

  // var logoutEmail = JSON.parse(localStorage.getItem('email'));

  // useEffect(() => {
  //   if (logoutEmail === 'user@gmail.com') {
  //     document.getElementById('foruser2').style.display = 'none';
  //   }
  // }, [logoutEmail])
  const TotalFiles = allImage.length


  return (
    <div>
      <Webnavbar />
      <div className='flex flex-wrap justify-between' style={{ width: '100%' }} >
        <div id="sidebarVanish" style={{ backgroundColor: 'white', marginTop: '155px', width: '25%' }} >
          <Websidebar Sout="/" Afile="/AddFile" />
        </div>
        <div className='cardresponsiveback  flex justify-start ' style={{ paddingTop: '110px', width: '75%', flexDirection: 'column', paddingRight: '40px' }} >
          <div className='cardresponsiveback' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', zIndex: -1, columnGap: '40px' }}>
            <Webcard2 price={FileAddToday} para="Files Added Today" heading1="Signed Today" />
            <Webcard2 price={filesAddedThisMonth} para="Files Added This Month" heading1="Signed This Month" />
            <Webcard2 price={TotalFiles} para="All Files" heading1="Total Files" color="#292929" text="white" reload="Reload" />
          </div>
          <div className='pt-8 flex justify-center tableResponsive ' >
            <TableWeb />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
