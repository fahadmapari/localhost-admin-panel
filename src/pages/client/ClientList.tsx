import ClientListTable from "@/components/client/ClientListTable";
import FiltersScreen from "@/components/common/FiltersScreen";

const ClientList = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-end mb-3">
        <h3 className="text-3xl font-semibold">Client List</h3>
        <div>
          <FiltersScreen />
        </div>
      </div>
      <ClientListTable />
    </div>
  );
};

export default ClientList;
