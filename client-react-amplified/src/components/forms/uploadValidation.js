import * as Yup from "yup";

const SUPPORTED_FORMATS = [
    "video/mp4"
  ];

const MB_CONST = 1048576;

// FILE SIZE = LIMINT IN MB * MB BYTES
const FILE_SIZE = 20 * MB_CONST;

const validationSchema = Yup.object().shape({
    videoName: Yup.string(),
    signedUrl: Yup.string().required("You need to sign the upload request first"),
    file: Yup.mixed()
            .required("No video file has been selected")
            .test( "videoSize",
                    "Video File too large",
                    value => value && value.size <= FILE_SIZE )
            .test(
                "fileFormat",
                "Unsupported Format",
                value => value && SUPPORTED_FORMATS.includes(value.type))
})

export default validationSchema;