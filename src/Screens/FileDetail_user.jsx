/* eslint-disable */
import '../App.css';
import { Webnavbar } from '../Components/Dashboardcomponents/Navbar';
import FileDetailComponent from '../Components/FileDetailComponent/fileComponent_user';


function FileDetail() {
    return (
        <div>
            <Webnavbar />
            <div className='flex justify-center ' style={{padding: 100, width: '100%' }} >
                    <FileDetailComponent />
            </div>
        </div>
    );
}
export default FileDetail;
