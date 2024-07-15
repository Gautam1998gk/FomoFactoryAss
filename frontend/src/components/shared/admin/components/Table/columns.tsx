import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { CrptoType } from "@/react-app-env"



export const columns: ColumnDef<CrptoType>[] = [

  /* {
    accessorKey: "_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
    cell: ({ row }) => {
      const product = row.original
    return <div className="w-[80px]">{product._id}</div>
  },
    enableSorting: false,
    enableHiding: false,
  }, */
  {
    accessorKey: "code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Crypto Code" />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "rate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rate" />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "volume",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Volume" />
    ),
    cell:({row})=>{
      const Val = parseFloat(row.getValue("volume"));
      return <div className="text-right font-medium">{Val}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "cap",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cap" />
    ),
    cell:({row})=>{
      const capVal = parseFloat(row.getValue("cap"));
      return <div className="text-right font-medium">{capVal}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-left">CreatedAt</div>,
    cell: ({ row }) => {
      const createdAt = new Date(row.getValue("createdAt"));
      const formattedCreatedAt = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      }).format(createdAt);
      return <div className="text-right font-medium">{formattedCreatedAt}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: () => <div className="text-left">UpdatedAt</div>,
    cell: ({ row }) => {
      const updatedAt = new Date(row.getValue("updatedAt"));
      const formattedDateAt = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short' // Optional
      }).format(updatedAt);
      return <div className="text-right font-medium">{formattedDateAt}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
