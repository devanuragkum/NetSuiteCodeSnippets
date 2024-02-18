/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define([
  "N/compress",
  "N/file",
  "N/format",
  "N/https",
  "N/query",
  "N/render",
  "N/ui/serverWidget",
], /**
 * @param{compress} compress
 * @param{file} file
 * @param{format} format
 * @param{https} https
 * @param{query} query
 * @param{render} render
 */
(compress, file, format, https, query, render, ServerWidget) => {
  /**
   * Defines the Suitelet script trigger point.
   * @param {Object} scriptContext
   * @param {ServerRequest} scriptContext.request - Incoming request
   * @param {ServerResponse} scriptContext.response - Suitelet response
   * @since 2015.2
   */
  const onRequest = (scriptContext) => {
    if (scriptContext.request.method === "GET") {
      fileUploaderForm(scriptContext);
    } else {
      fileProcess(scriptContext);
    }
  };

  const fileUploaderForm = (scriptContext) => {
    let form = ServerWidget.createForm({
      title: "File Uploader",
    });

    let fileField = form.addField({
      id: "custpage_file",
      type: ServerWidget.FieldType.FILE,
      label: "Select File",
    });

    form.addSubmitButton({
      label: "Submit",
    });

    scriptContext.response.writePage(form);
  };

  const fileProcess = (scriptContext) => {
    const custpage_file = scriptContext.request.files.custpage_file;

    custpage_file.folder = 13068;
    const id = custpage_file.save();

    scriptContext.response.write(
      "Upload Successful. Close this page or press back button"
    );
  };

  return { onRequest };
});
