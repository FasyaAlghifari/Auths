import React, { useState, useEffect } from "react";
import App from "../../../components/Layouts/App";
import Swal from "sweetalert2";
import { SearchInput } from "../../../components/Elements/SearchInput";
import { ReusableForm } from "../../../components/Fragments/Services/ReusableForm";
import { FormatDate } from "../../../Utilities/FormatDate";
import { usePagination } from "../../../Utilities/usePagination";
import {
  Button,
  Dropdown,
  Table,
  Badge,
  Modal,
  Pagination,
  Checkbox,
} from "flowbite-react";
import {
  getSurats,
  addSurat,
  updateSurat,
  deleteSurat,
} from "../../../../API/Dokumen/surat.service";

export function SuratPage() {
  const [MainData, setMainData] = useState([]);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({});
  const [formConfig, setFormConfig] = useState({
    fields: [
      { name: "tanggal", label: "Tanggal", type: "date", required: true },
      { name: "no_surat", label: "Nomor Surat", type: "text", required: true },
      { name: "perihal", label: "Perihal", type: "text", required: true },
      { name: "pic", label: "Pic", type: "text", required: true },
    ],
    services: "surat",
  });
  const { currentPage, paginate, getTotalPages } = usePagination(1, 10);
  const [selectedIds, setSelectedIds] = useState([]);

  // UseEffect untuk mengambil data saat komponen dimount dan di balikan urutan
  useEffect(() => {
    getSurats((data) => {
      // ambil dari API
      setMainData(data.reverse());
    });
  }, []);

  // Function untuk fetch data dan update state
  const handleAdd = () => {
    setFormModalOpen(true);
    setFormConfig((prevConfig) => ({
      ...prevConfig,
      action: "add",
      onSubmit: (data) => AddSubmit(data),
    }));
  };

  // Function untuk handle tutup form modal
  const onCloseFormModal = () => {
    setFormModalOpen(false);
    setFormData({});
  };

  // Function untuk fetch data dan update state
  const handleEdit = (MainData) => {
    setFormModalOpen(true);
    setFormConfig((prevConfig) => ({
      ...prevConfig,
      action: "edit",
      onSubmit: (data) => EditSubmit(data),
    }));
    setFormData({ ...MainData });
  };

  // tambah data
  const AddSubmit = async (data) => {
    try {
      await addSurat(data); // tambah data ke API
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Data berhasil ditambahkan",
        showConfirmButton: false,
        timer: 1000,
      }).then(() => {
        setMainData([...MainData, data]);
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Error saat menyimpan data",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      onCloseFormModal();
    }
  };

  // ubah data
  const EditSubmit = async (data) => {
    try {
      await updateSurat(data.ID, data); // edit data ke API
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Data berhasil diperbarui",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        setMainData(
          MainData.map((item) => {
            return item.ID === data.ID ? data : item;
          })
        );
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Error saat mengubah data",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      onCloseFormModal();
    }
  };

  // Function untuk hapus 1 data
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda akan menghapus data ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, saya yakin",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteSurat(id); // hapus data di API
          setMainData((prevData) => prevData.filter((data) => data.ID !== id));
          Swal.fire({
            icon: "info",
            title: "Berhasil!",
            text: "Data berhasil dihapus",
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (error) {
          Swal.fire("Gagal!", "Error saat hapus data:", "error");
        }
      }
    });
  };

  // Function untuk hapus multi select checkbox
  const handleBulkDelete = async () => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda akan menghapus data yang dipilih!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, saya yakin",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await Promise.all(selectedIds.map((id) => deleteSurat(id))); // hapus data di API
          setMainData((prevData) =>
            prevData.filter((data) => !selectedIds.includes(data.ID))
          );
          setSelectedIds([]);
          Swal.fire({
            icon: "info",
            title: "Berhasil!",
            text: "Data berhasil dihapus",
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (error) {
          Swal.fire("Gagal!", "Error saat hapus data:", "error");
        }
      }
    });
  };

  // Function untuk handle search
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value || "");
  };

  // Function to handle checkbox changes
  const handleCheckboxChange = (id) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };

  // Hitung indeks awal dan akhir untuk penomoran paginate
  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;

  // Get data paginate dan filter search
  const searchProps = formConfig.fields.map((field) => field.name);
  const Paginated = MainData.filter((data) => {
    const search = searchTerm.toLowerCase();
    return searchProps.some((prop) =>
      (data[prop]?.toLowerCase() || "").includes(search)
    );
  }).slice(startIndex, endIndex);

  return (
    <App services={formConfig.services}>
      <div className="grid grid-rows-3minmax">
        {/* page title */}
        <div className="flex justify-between items-center mx-2 mb-2 ">
          <div className="flex gap-1.5 items-center justify-center">
            <Button
              className="flex justify-center items-center"
              onClick={handleAdd}
              action="add"
              color="info"
            >
              Tambah
            </Button>
            <Dropdown
              color="success"
              label="Export Excel"
              dismissOnClick={false}
            >
              <Dropdown.Item>This Sheet</Dropdown.Item>
              <Dropdown.Item>All Sheet</Dropdown.Item>
            </Dropdown>
            <Dropdown
              color="success"
              label="Update Excel"
              dismissOnClick={false}
            >
              <Dropdown.Item>This Sheet</Dropdown.Item>
              <Dropdown.Item>All Sheet</Dropdown.Item>
            </Dropdown>
            <Button color="success">Import Excel</Button>
            <Button
              color="failure"
              onClick={handleBulkDelete}
              disabled={selectedIds.length === 0}
            >
              Hapus Data dipilih
            </Button>
          </div>
          <SearchInput value={searchTerm} onChange={handleSearchChange} />
        </div>
        {/* End page title */}

        {/* table */}
        <div className="overflow-auto p-2">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className="text-center">
                <span>select</span>
              </Table.HeadCell>
              {formConfig.fields.map((field, index) => (
                <Table.HeadCell key={index}>{field.label}</Table.HeadCell>
              ))}
              <Table.HeadCell>
                <span>Action</span>
              </Table.HeadCell>
            </Table.Head>
            {Paginated.length > 0 ? (
              <Table.Body className="divide-y">
                {Paginated.map((data) => (
                  <Table.Row key={data.ID}>
                    <Table.Cell className="text-center">
                      <Checkbox
                        checked={selectedIds.includes(data.ID)}
                        onChange={() => handleCheckboxChange(data.ID)}
                      />
                    </Table.Cell>
                    {formConfig.fields.map((field, index) => (
                      <Table.Cell key={index}>{data[field.name]}</Table.Cell>
                    ))}
                    <Table.Cell>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleEdit(data)}
                          action="edit"
                          color="warning"
                        >
                          Ubah
                        </Button>
                        <Button
                          onClick={() => handleDelete(data.ID)}
                          color="failure"
                        >
                          Hapus
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            ) : (
              <Table.Body className="divide-y">
                <Table.Row>
                  <Table.Cell
                    colSpan={formConfig.fields.length + 2}
                    className="text-center"
                  >
                    <Badge className="p-4 font-bold" color="red">
                      Belum Ada Data yang Tersedia
                    </Badge>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            )}
          </Table>
        </div>
        {/* End Table */}

        {/* Pagination */}
        <div className="flex justify-between items-end overflow-x-auto m-2 dark:text-white">
          <h1>© 2024 IT Security</h1>
          <Pagination
            currentPage={currentPage}
            totalPages={getTotalPages(MainData.length)}
            onPageChange={paginate}
          />
        </div>
        {/* End Pagination */}

        {/* ModalForm */}
        <Modal show={formModalOpen} size="xl" onClose={onCloseFormModal} popup>
          <Modal.Header />
          <Modal.Body>
            <ReusableForm
              config={formConfig}
              formData={formData}
              setFormData={setFormData}
            />
          </Modal.Body>
        </Modal>
        {/* endModalForm */}
      </div>
    </App>
  );
}
