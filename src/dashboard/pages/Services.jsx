import { useState } from "react";
import { useForm } from "react-hook-form";
import useService from "../../hooks/useService";
import Drawer from "../../components/ui/Drawer";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";
import toast, { Toaster } from "react-hot-toast";
import { Plus } from "lucide-react";
import MediaPicker from "../../components/media/MediaPicker";

export default function Services() {
  const {
    services,
    categories,
    fetchServices,
    createService,
    updateService,
    deleteService,
    attachMedia,
  } = useService();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mediaModal, setMediaModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [editing, setEditing] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      let res;

      if (editing) {
        res = await updateService(editing.id, data);
        toast.success("Service updated");
      } else {
        res = await createService(data);
        toast.success("Service created");
      }

      const service = res.data;

      if (selectedMedia) {
        await attachMedia({
          media_id: selectedMedia.id,
          mediable_id: service.id,
          mediable_type: "App\\Models\\Service",
        });
      }

      reset();
      setDrawerOpen(false);
      setSelectedMedia(null);
      fetchServices();
    } catch {
      toast.error("Error saving service");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this service?")) return;
    await deleteService(id);
    fetchServices();
  };

  const columns = [
    { key: "id", label: "ID" },
    {
      key: "media",
      label: "Image",
      render: (row) =>
        row.media?.length ? (
          <img
            src={row.media[0].original_url}
            className="h-12 w-12 rounded object-cover"
          />
        ) : (
          "No Image"
        ),
    },
    { key: "title", label: "Title" },
    { key: "price", label: "Price" },
    { key: "duration", label: "Duration" },
    { key: "duration_unit", label: "Unit" },
    { key: "type", label: "Type" },
    {
      key: "category",
      label: "Category",
      render: (row) => row.category?.title || "N/A",
    },
  ];

  return (
    <div>
      <Toaster />

      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Services</h1>

        <Button
          onClick={() => {
            setEditing(null);
            setSelectedMedia(null);
            reset();
            setDrawerOpen(true);
          }}
        >
          <Plus className="mr-1" size={16} /> Add Service
        </Button>
      </div>

      <Table
        columns={columns}
        data={services}
        onEdit={(row) => {
          setEditing(row);
          setSelectedMedia(row.media?.[0] || null);
          reset(row);
          setDrawerOpen(true);
        }}
        onDelete={handleDelete}
      />

      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} title="Service">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input label="Title" {...register("title", { required: true })} />
          <Input
            label="Duration"
            {...register("duration", { required: true })}
          />
          <Input label="Duration Unit" {...register("duration_unit")} />
          <Input
            label="Required Servicemen"
            type="number"
            {...register("required_servicemen")}
          />
          <Input label="Discount" type="number" {...register("discount")} />
          <Input label="Price" type="number" {...register("price")} />
          <Input
            label="Service Rate"
            type="number"
            {...register("service_rate")}
          />
          <Input label="Type" {...register("type", { required: true })} />

          <select
            className="w-full border p-2 rounded mt-2"
            {...register("category_id")}
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>

          <Button
            type="button"
            className="w-full mt-3"
            onClick={() => setMediaModal(true)}
          >
            Select Image
          </Button>

          {selectedMedia && (
            <img
              src={selectedMedia.original_url}
              className="h-20 mt-3 rounded"
            />
          )}

          <Button type="submit" className="w-full mt-4">
            {editing ? "Update" : "Create"}
          </Button>
        </form>
      </Drawer>

      <MediaPicker
        open={mediaModal}
        onClose={() => setMediaModal(false)}
        onSelect={(img) => {
          setSelectedMedia(img);
          setMediaModal(false);
        }}
      />
    </div>
  );
}
