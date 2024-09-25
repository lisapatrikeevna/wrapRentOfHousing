import { Paper } from "@mui/material";
import { useGetRealtyQuery } from "../bll/realty/realty.service";

const RealEstateItem = () => {
const [realty,{isLoading,isError}]=useGetRealtyQuery()
  console.log('realty', realty);

  return <Paper>
    RealEstateItem
    </Paper>
};

export default RealEstateItem;
