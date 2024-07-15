
import { useSearchParams } from "react-router-dom";
import { Card } from "../../components/ui/card";
import { useGetBitCoinDatacodeQuery } from "../../redux/slice/CryptoSlice";
import { DataTable } from "../../components/shared/admin/components/Table/data-table";
import { columns } from "../../components/shared/admin/components/Table/columns";

export default function HomeAdmin() {
  const [searchparams]=useSearchParams()

  const id = searchparams.get("crpto")||"BTC";
 const {data:crypto,isError,isLoading,isSuccess,error}= useGetBitCoinDatacodeQuery(id,{refetchOnFocus:true,pollingInterval:15000,refetchOnMountOrArgChange:true})
 let content;

   if (isLoading) {
     content = (
         <div className="flex justify-center items-center h-full my-6">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
         </div>
     );
 }
 
   if (isError) content = <p>{crypto?.message}</p>

 
   if (isSuccess){
     content=  <section className=" max-w-full">
     <main className=" border-2  bg-red-50  border-gray-500 md:mx-8 md:my-12 md:p-4">
        <div className="flex justify-between p-4">
         <h5 className='h5-bold'>{id}</h5>
       </div>
       {crypto.length>0?<div className=" p-4 rounded-md border-2 md:overflow-hidden shadow-lg bg-green-50">
         {crypto.length>0 && <DataTable data={crypto} columns={columns}/>}
       </div>:<p className=" p-4 rounded-md border-2  md:overflow-hidden shadow-lg bg-green-50">
         No Crypto Data available Under Selected Crypto
       </p>}
     </main>
     </section>
   }

  return <>{content}</>
}
