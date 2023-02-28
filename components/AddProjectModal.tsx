import useProjectUtility from "@/hooks/useProjectUtility";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineCloudUpload } from "react-icons/ai";
import * as yup from "yup";
import { MdEdit } from "react-icons/md";
import { DocumentData } from "firebase/firestore";

interface Inputs {
  link: string;
  title: string;
  isVisible: string;
}
interface Props {
  editProjects: boolean;
  project?: DocumentData;
}

// Using this component both for uploading and editing the project
export default function AddProjectModal({ editProjects, project }: Props) {
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>();
  const [newImage, setNewImage] = useState<string | null>(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { uploadProject, updateProject } = useProjectUtility();

  // Making sure there is a valid URL on link input
  const schema = yup.object().shape({
    link: yup.string().url(),
  });

  useEffect(() => {
    project !== undefined
      ? setImagePreview(project.image)
      : setImagePreview(null);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  // Submiting the form, checking if editProject is true and update the existing project or create a new one
  const onSubmit: SubmitHandler<Inputs> = async ({
    title,
    link,
    isVisible,
  }) => {
    imagePreview &&
      (editProjects
        ? updateProject(project?.id, title, link, newImage, isVisible)
        : uploadProject(title, link, imagePreview, isVisible));

    handleClose();
    !editProjects && setImagePreview(null);
    reset();
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (
      e.target.files &&
      e.target.files.length > 0 &&
      e.target.files[0].size > 2000000
    ) {
      alert("Size must be lower than 2mb");
      return;
    }
    if (e.target.files && e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      const image = readerEvent.target?.result as string;
      setImagePreview(image);
      if (editProjects) {
        setNewImage(image);
      }
    };
  };

  return (
    <div>
      <div className="flex gap-4 " onClick={handleOpen}>
        {editProjects ? (
          <MdEdit className="w-6 h-6 text-white cursor-pointer" />
        ) : (
          <button className="bg-[#FF914D] py-2 rounded-md md:px-8 text-white font-medium px-4">
            Upload
          </button>
        )}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="bg-white rounded-xl h-fit max-w-[90vw] md:max-w-[626px] absolute top-0 bottom-0 left-0 right-0 m-auto">
          <h2 className="text-center font-medium py-3 border-b dark:text-black">
            {editProjects ? "Edit Project" : "New Project"}
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-3 md:p-8 min-h-[40vh] "
          >
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  width={100}
                  height={100}
                  alt="Preview"
                  className="object-contain w-full h-full"
                />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <AiOutlineCloudUpload className="w-14 h-14 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG or JPG (max 1mb)
                  </p>
                </div>
              )}
              <input
                id="dropzone-file"
                type="file"
                accept=".png, .svg, .jpg"
                required={editProjects && false}
                name="projectImage"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            {imagePreview && !editProjects && (
              <button
                onClick={() => setImagePreview(null)}
                className="text-red-500"
              >
                Delete photo
              </button>
            )}
            <label className="mt-4 block dark:text-black">
              Project title
              <input
                required
                defaultValue={editProjects ? project?.title : null}
                className="border rouned-md w-full p-2 focus:outline-none"
                {...register("title")}
              />
            </label>
            <label className="mt-4 block dark:text-black">
              Website Link
              <input
                defaultValue={editProjects ? project?.link : null}
                className="border rouned-md w-full p-2 focus:outline-none"
                {...register("link")}
              />
              {errors.link ? (
                <span className="text-red-500">
                  Website Link must be a valid URL
                </span>
              ) : null}
            </label>
            <label className="mt-4 block dark:text-black">
              Project visible
              <div className="flex">
                <label className="inline-flex items-center ml-2">
                  <input
                    type="radio"
                    defaultChecked={
                      editProjects && project?.projectVisible === "yes"
                    }
                    value="yes"
                    {...register("isVisible")}
                    className="form-radio h-5 w-5 text-gray-600"
                  />
                  <span className="ml-2 text-gray-700">Yes</span>
                </label>
                <label className="inline-flex items-center ml-8">
                  <input
                    type="radio"
                    defaultChecked={
                      editProjects && project?.projectVisible === "no"
                    }
                    {...register("isVisible")}
                    value="no"
                    className="form-radio h-5 w-5 text-gray-600"
                  />
                  <span className="ml-2 text-gray-700">No</span>
                </label>
              </div>
            </label>

            <button
              type="submit"
              className="btn-primary bg-[#FF914D] font-medium mt-4 w-full"
            >
              {editProjects ? "Save changes" : "Upload Project"}
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
