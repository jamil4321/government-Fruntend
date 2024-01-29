import '../App.css';
import { Webnavbar } from '../Components/Dashboardcomponents/Navbar';
import { Websidebar } from '../Components/Dashboardcomponents/sidebar';
import FileDetailComponent from '../Components/FileDetailComponent/fileComponent';


function FileDetail() {
    return (
        <div>
            <Webnavbar />
            <div className='flex flex-wrap justify-between' style={{ width: '100%' }} >
                <div id="sidebarVanish" style={{ backgroundColor: 'white', marginTop: '155px', width: '25%' }} >
                    <Websidebar Sout="/" Dboard="/Dashboard" />
                </div>
                <div className='cardresponsiveback  flex justify-center ' style={{ paddingTop: '130px', width: '75%' }} >

                    <FileDetailComponent />

                </div>
            </div>
        </div>
    );
}
export default FileDetail;
