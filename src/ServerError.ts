/**
 * Copyright 2022 NTT Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export enum ServerErrorCode {
  SAVE_PROJECT_FAILED = "save_project_failed",
  GET_PROJECT_FAILED = "get_project_failed",
  GET_SETTINGS_FAILED = "get_settings_failed",
  SAVE_SETTINGS_FAILED = "save_settings_failed",
  GET_DEVICE_SETTINGS_FAILED = "get_device_settings_failed",
  SAVE_DEVICE_SETTINGS_FAILED = "save_device_settings_failed",
  SAVE_TEST_SCRIPT_FAILED = "save_test_script_failed",
  SAVE_SNAPSHOT_FAILED = "save_snapshot_failed",
  CREATE_TEST_RESULT_FAILED = "save_test_result_failed",
  GET_TEST_RESULT_FAILED = "get_test_result_failed",
  ADD_TEST_STEP_FAILED = "add_test_step_failed",
  GET_TEST_STEP_FAILED = "get_test_step_failed",
  EDIT_TEST_STEP_FAILED = "edit_test_step_failed",
  ADD_NOTE_FAILED = "add_note_failed",
  GET_NOTE_FAILED = "get_note_failed",
  EDIT_NOTE_FAILED = "edit_note_failed",
  DELETE_NOTE_FAILED = "delete_note_failed",
  COMPRESS_NOTE_IMAGE_FAILED = "compress_note_image_failed",
  COMPRESS_TEST_STEP_IMAGE_FAILED = "compress_test_step_image_failed",
  UPDATE_TEST_RESULT_FAILED = "update_test_result_failed",
  DELETE_TEST_RESULT_FAILED = "delete_test_result_failed",
  PATCH_SESSION_FAILED = "patch_session_failed",
  GET_SESSION_FAILED = "get_session_failed",
  GET_SERVERNAME_FAILED = "get_servername_failed",
  EXPORT_TEST_RESULT_FAILED = "export_test_result_failed",
  IMPORT_TEST_RESULT_FAILED = "import_test_result_failed",
  EXPORT_PROJECT_FAILED = "export_project_failed",
  IMPORT_PROJECT_FAILED = "import_project_failed",
  IMPORT_PROJECT_NOT_EXIST = "import_project_not_exist",
  IMPORT_TEST_RESULT_NOT_EXIST = "import_test_result_not_exist",
  FILE_UPLOAD_REQUEST_FAILED = "upload_request_failed",
  FILE_UPLOAD_FAILED = "upload_failed",
  GET_SCREENSHOTS_FAILED = "get_screenshots_failed",
  GET_TEST_MATRIX_FAILED = "get_test_matrix_failed",
  POST_TEST_MATRIX_FAILED = "post_test_matrix_failed",
  PATCH_TEST_MATRIX_FAILED = "patch_test_matrix_failed",
  DELETE_TEST_MATRIX_FAILED = "delete_test_matrix_failed",
  GET_TEST_TARGET_GROUP_FAILED = "get_test_target_group_failed",
  POST_TEST_TARGET_GROUP_FAILED = "post_test_target_group_failed",
  PATCH_TEST_TARGET_GROUP_FAILED = "patch_test_target_group_failed",
  DELETE_TEST_TARGET_GROUP_FAILED = "delete_test_target_group_failed",
  GET_TEST_TARGET_FAILED = "get_test_target_failed",
  POST_TEST_TARGET_FAILED = "post_test_target_failed",
  PATCH_TEST_TARGET_FAILED = "patch_test_target_failed",
  DELETE_TEST_TARGET_FAILED = "delete_test_target_failed",
  GET_VIEW_POINT_FAILED = "get_view_point_failed",
  POST_VIEW_POINT_FAILED = "post_view_point_failed",
  PATCH_VIEW_POINT_FAILED = "patch_view_point_failed",
  DELETE_VIEW_POINT_FAILED = "delete_view_point_failed",
  NO_TEST_CASES_GENERATED = "no_test_cases_generated",
  GET_TEST_PROGRESS_FAILED = "get_test_progress_failed",
}

export interface ServerErrorData {
  code: ServerErrorCode;
  message?: string;
  details?: Array<{
    code: string;
    message: string;
    target: string;
  }>;
}

export class ServerError extends Error {
  constructor(public statusCode: number, public data?: ServerErrorData) {
    super(data?.message ?? "");
  }
}
