import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const CoffeeCard = ({ coffee, coffees, setCoffees }) => {
  const { _id, photo, name, quantity, supplier, taste } =
    coffee;

  const handledelete = (_id) => {
    console.log(_id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/coffee/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your Coffee has been deleted.", "success");
              const remaining = coffees.filter(coff => coff._id !== _id)
              setCoffees(remaining);
            }
          });
      }
    });
  };

  return (
    <div className="">
      <div className="card card-side bg-base-100 shadow-xl p-8">
        <figure>
          <img src={photo} />
        </figure>
        <div className="flex justify-between w-full pr-4">
          <div>
            <h2 className="card-title">{name}</h2>
            <p>{quantity}</p>
            <p>{supplier}</p>
            <p>{taste}</p>
          </div>
          <div className="card-actions justify-end">
            <div className="btn-group btn-group-vertical space-y-4">
              <button className="btn bg-orange-600 text-white">View</button>
              <Link to={`updateCoffee/${_id}`}>
                <button className="border-gray-700 text-white bg-slate-600 hover:bg-slate-800 font-normal text-xl py-3 px-8">
                  Edit
                </button>
              </Link>
              <button
                onClick={() => {
                  handledelete(_id);
                }}
                className="btn bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeCard;
