/* eslint-disable */
import '../App.css';
import { Webnavbar } from '../Components/Dashboardcomponents/Navbar';
import { Websidebar } from '../Components/Dashboardcomponents/sidebar';
import { Webcard2 } from '../Components/Dashboardcomponents/card2';
import TableWeb from '../Components/Dashboardcomponents/table';
import { useState, useEffect, useContext } from "react";
import { UserContext } from '../context';


function Dashboard() {
  const [allImage, setAllImage] = useState([]);
  const [search, setSearch] = useState('');
  const [FileAddToday, setFileAddToday] = useState('0');
  const [filesAddedThisMonth, setfilesAddedThisMonth] = useState('0')
  const [totalFiles, setTotalFiles] = useState('0')
  const {user} = useContext(UserContext)

  useEffect(() => {
    if(user) getImage(user._id,user.type)
  }, [user])

  useEffect(()=>{
    if(allImage){
      let filesAddedToday = 0;
      let filesAddedThisMonth = 0;
      const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const currentMonth = new Date().toLocaleDateString('en-US', { month: 'short' });
      allImage.map((img)=>{
        const itemDate = img.date;
        const thismonth = img.date.slice(0, 3);
        if (currentMonth === thismonth) {
          filesAddedThisMonth++;
          
        }
        if (itemDate.includes(currentDate)) {
          filesAddedToday++;
         
        }
      })
        setfilesAddedThisMonth(filesAddedThisMonth)
        setFileAddToday(filesAddedToday)
      console.log(filesAddedToday,"filesAddedToday",filesAddedThisMonth,"filesAddedThisMonth")
    }
  },[allImage])
  function getImage(id,type) {
    fetch(type === "admin"?"http://192.168.100.2:5000/get-image":`http://192.168.100.2:5000/get-image-by-User/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setAllImage(data.data)
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  }
console.log("FileAddToday",FileAddToday,"filesAddedThisMonth",filesAddedThisMonth,totalFiles,"TotalFiles")
  return (
    <div>
      <Webnavbar />
      <div className='flex flex-wrap justify-between' style={{ width: '100%' }} >
        <div id="sidebarVanish" style={{ backgroundColor: 'white', marginTop: '155px', width: '25%' }} >
          <Websidebar Sout="/" Afile="/AddFile" />
        </div>
        <div className='cardresponsiveback  flex justify-start ' style={{ paddingTop: '110px', width: '75%', flexDirection: 'column', paddingRight: '40px' }} >
         {allImage && <div className='cardresponsiveback' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', zIndex: -1, columnGap: '40px' }}>
            <Webcard2 price={FileAddToday} para="Files Added Today" heading1="Signed Today" />
            <Webcard2 price={filesAddedThisMonth} para="Files Added This Month" heading1="Signed This Month" />
            <Webcard2 price={allImage ? allImage.length :0} para="All Files" heading1="Total Files" color="#292929" text="white" reload="Reload" />
          </div>}
          <div className='pt-8 flex justify-center tableResponsive ' >
            <TableWeb allImage={allImage} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
