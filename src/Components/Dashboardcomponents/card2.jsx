import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import '../../App.css'
export function Webcard2(props) {
  return (
    <Card className="mt-6 bg-white" id="card2" style={{ backgroundColor: props.color, color: props.text, display: "flex", justifyContent: 'center', width: '310px', marginLeft: '20px' }} >
      <CardBody>
        <Typography variant="h6" color="blue-gray" className="mb-2 text-#56613F" >
          {props.heading1}
        </Typography>
        <Typography variant="h3" color="blue-gray" className="mb-2 text-#56613F" >
          {props.price}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0" style={{ marginTop: "-30px", marginLeft: "4px" }}>
        <Typography variant="h6" color="blue-gray" className="mb-2 text-#56613F" >
          {props.para}
        </Typography>
      </CardFooter>
    </Card>
  );
}

