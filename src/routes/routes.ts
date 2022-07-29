/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import {
  Controller,
  ValidationService,
  FieldErrors,
  ValidateError,
  TsoaRoute,
  HttpStatusCodeLiteral,
  TsoaResponse,
} from "@tsoa/runtime";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ConfigsController } from "./../controllers/ConfigsController";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { DeviceConfigsController } from "./../controllers/DeviceConfigsController";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { FileUploadController } from "./../controllers/FileUploadController";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TestResultUploadRequestController } from "./../controllers/TestResultUploadRequestController";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { NoteCompressedImageController } from "./../controllers/NoteCompressedImageController";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { NotesController } from "./../controllers/NotesController";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ProjectExportController } from "./../controllers/ProjectExportController";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ProjectImportController } from "./../controllers/ProjectImportController";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ProjectsController } from "./../controllers/ProjectsController";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ProjectTestScriptsController } from "./../controllers/ProjectTestScriptsController";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ServerNameController } from "./../controllers/ServerNameController";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SessionsController } from "./../controllers/SessionsController";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SnapshotsController } from "./../controllers/SnapshotsController";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TestResultExportController } from "./../controllers/TestResultExportController";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TestResultImportController } from "./../controllers/TestResultImportController";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TestResultsController } from "./../controllers/TestResultsController";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TestScriptsController } from "./../controllers/TestScriptsController";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TestStepsController } from "./../controllers/TestStepsController";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ScreenshotsController } from "./../controllers/ScreenshotsController";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TestMatricesController } from "./../controllers/TestMatricesController";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TestTargetGroupsController } from "./../controllers/TestTargetGroupsController";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TestTargetsController } from "./../controllers/TestTargetsController";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ViewPointsController } from "./../controllers/ViewPointsController";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { StoriesController } from "./../controllers/StoriesController";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CompressedImageController } from "./../controllers/CompressedImageController";
import * as express from "express";

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
  TestResultUploadRequestDto: {
    dataType: "refObject",
    properties: {
      source: {
        dataType: "nestedObjectLiteral",
        nestedProperties: {
          testResultId: { dataType: "string", required: true },
        },
        required: true,
      },
      dest: {
        dataType: "nestedObjectLiteral",
        nestedProperties: {
          testResultId: { dataType: "string" },
          repositoryUrl: { dataType: "string", required: true },
        },
        required: true,
      },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CreateResponseDto: {
    dataType: "refObject",
    properties: {
      imageFileUrl: { dataType: "string", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Note: {
    dataType: "refObject",
    properties: {
      id: { dataType: "string", required: true },
      type: { dataType: "string", required: true },
      value: { dataType: "string", required: true },
      details: { dataType: "string", required: true },
      imageFileUrl: { dataType: "string", required: true },
      tags: {
        dataType: "array",
        array: { dataType: "string" },
        required: true,
      },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CreateNoteResponse: {
    dataType: "refAlias",
    type: { ref: "Note", validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CreateNoteDto: {
    dataType: "refObject",
    properties: {
      type: { dataType: "string", required: true },
      value: { dataType: "string", required: true },
      details: { dataType: "string", required: true },
      imageData: { dataType: "string" },
      tags: { dataType: "array", array: { dataType: "string" } },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  GetNoteResponse: {
    dataType: "refAlias",
    type: { ref: "Note", validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  UpdateNoteResponse: {
    dataType: "refAlias",
    type: { ref: "Note", validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  UpdateNoteDto: {
    dataType: "refObject",
    properties: {
      type: { dataType: "string", required: true },
      value: { dataType: "string", required: true },
      details: { dataType: "string", required: true },
      tags: { dataType: "array", array: { dataType: "string" } },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CreateProjectExportDto: {
    dataType: "refObject",
    properties: {
      includeTestResults: { dataType: "boolean", required: true },
      includeProject: { dataType: "boolean", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CreateProjectImportDto: {
    dataType: "refObject",
    properties: {
      source: {
        dataType: "nestedObjectLiteral",
        nestedProperties: {
          projectFileUrl: { dataType: "string", required: true },
        },
        required: true,
      },
      includeTestResults: { dataType: "boolean", required: true },
      includeProject: { dataType: "boolean", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  ProjectListResponse: {
    dataType: "refObject",
    properties: {
      id: { dataType: "string", required: true },
      name: { dataType: "string", required: true },
      createdAt: { dataType: "string", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  StoryDetails: {
    dataType: "refObject",
    properties: {
      id: { dataType: "string", required: true },
      testMatrixId: { dataType: "string", required: true },
      testTargetId: { dataType: "string", required: true },
      viewPointId: { dataType: "string", required: true },
      status: { dataType: "string", required: true },
      sessions: {
        dataType: "array",
        array: {
          dataType: "nestedObjectLiteral",
          nestedProperties: {
            testingTime: { dataType: "double", required: true },
            testerName: { dataType: "string", required: true },
            testResultFiles: {
              dataType: "array",
              array: {
                dataType: "nestedObjectLiteral",
                nestedProperties: {
                  id: { dataType: "string", required: true },
                  name: { dataType: "string", required: true },
                },
              },
            },
            testItem: { dataType: "string", required: true },
            name: { dataType: "string", required: true },
            memo: { dataType: "string", required: true },
            issues: {
              dataType: "array",
              array: {
                dataType: "nestedObjectLiteral",
                nestedProperties: {
                  imageFilePath: { dataType: "string" },
                  value: { dataType: "string", required: true },
                  type: { dataType: "string", required: true },
                  ticketId: { dataType: "string", required: true },
                  status: { dataType: "string", required: true },
                  source: {
                    dataType: "nestedObjectLiteral",
                    nestedProperties: {
                      type: { dataType: "string", required: true },
                      index: { dataType: "double", required: true },
                    },
                    required: true,
                  },
                  details: { dataType: "string", required: true },
                },
              },
              required: true,
            },
            isDone: { dataType: "boolean", required: true },
            doneDate: { dataType: "string", required: true },
            attachedFiles: {
              dataType: "array",
              array: {
                dataType: "nestedObjectLiteral",
                nestedProperties: {
                  fileUrl: { dataType: "string" },
                  name: { dataType: "string", required: true },
                },
              },
              required: true,
            },
            id: { dataType: "string", required: true },
          },
        },
        required: true,
      },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Project: {
    dataType: "refObject",
    properties: {
      id: { dataType: "string", required: true },
      name: { dataType: "string", required: true },
      testMatrices: {
        dataType: "array",
        array: {
          dataType: "nestedObjectLiteral",
          nestedProperties: {
            viewPoints: {
              dataType: "array",
              array: {
                dataType: "nestedObjectLiteral",
                nestedProperties: {
                  description: { dataType: "string", required: true },
                  index: { dataType: "double", required: true },
                  name: { dataType: "string", required: true },
                  id: { dataType: "string", required: true },
                },
              },
              required: true,
            },
            groups: {
              dataType: "array",
              array: {
                dataType: "nestedObjectLiteral",
                nestedProperties: {
                  testTargets: {
                    dataType: "array",
                    array: {
                      dataType: "nestedObjectLiteral",
                      nestedProperties: {
                        plans: {
                          dataType: "array",
                          array: {
                            dataType: "nestedObjectLiteral",
                            nestedProperties: {
                              value: { dataType: "double", required: true },
                              viewPointId: {
                                dataType: "string",
                                required: true,
                              },
                            },
                          },
                          required: true,
                        },
                        index: { dataType: "double", required: true },
                        name: { dataType: "string", required: true },
                        id: { dataType: "string", required: true },
                      },
                    },
                    required: true,
                  },
                  index: { dataType: "double", required: true },
                  name: { dataType: "string", required: true },
                  id: { dataType: "string", required: true },
                },
              },
              required: true,
            },
            index: { dataType: "double", required: true },
            name: { dataType: "string", required: true },
            id: { dataType: "string", required: true },
          },
        },
        required: true,
      },
      stories: {
        dataType: "array",
        array: { dataType: "refObject", ref: "StoryDetails" },
        required: true,
      },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  GetProjectResponse: {
    dataType: "refAlias",
    type: { ref: "Project", validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "Pick_Project.Exclude_keyofProject.progressDatas__": {
    dataType: "refAlias",
    type: {
      dataType: "nestedObjectLiteral",
      nestedProperties: {
        id: { dataType: "string", required: true },
        name: { dataType: "string", required: true },
        testMatrices: {
          dataType: "array",
          array: {
            dataType: "nestedObjectLiteral",
            nestedProperties: {
              viewPoints: {
                dataType: "array",
                array: {
                  dataType: "nestedObjectLiteral",
                  nestedProperties: {
                    description: { dataType: "string", required: true },
                    index: { dataType: "double", required: true },
                    name: { dataType: "string", required: true },
                    id: { dataType: "string", required: true },
                  },
                },
                required: true,
              },
              groups: {
                dataType: "array",
                array: {
                  dataType: "nestedObjectLiteral",
                  nestedProperties: {
                    testTargets: {
                      dataType: "array",
                      array: {
                        dataType: "nestedObjectLiteral",
                        nestedProperties: {
                          plans: {
                            dataType: "array",
                            array: {
                              dataType: "nestedObjectLiteral",
                              nestedProperties: {
                                value: { dataType: "double", required: true },
                                viewPointId: {
                                  dataType: "string",
                                  required: true,
                                },
                              },
                            },
                            required: true,
                          },
                          index: { dataType: "double", required: true },
                          name: { dataType: "string", required: true },
                          id: { dataType: "string", required: true },
                        },
                      },
                      required: true,
                    },
                    index: { dataType: "double", required: true },
                    name: { dataType: "string", required: true },
                    id: { dataType: "string", required: true },
                  },
                },
                required: true,
              },
              index: { dataType: "double", required: true },
              name: { dataType: "string", required: true },
              id: { dataType: "string", required: true },
            },
          },
          required: true,
        },
        stories: {
          dataType: "array",
          array: { dataType: "refObject", ref: "StoryDetails" },
          required: true,
        },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "Omit_Project.progressDatas_": {
    dataType: "refAlias",
    type: {
      ref: "Pick_Project.Exclude_keyofProject.progressDatas__",
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  UpdateProjectResponse: {
    dataType: "refAlias",
    type: { ref: "Omit_Project.progressDatas_", validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  UpdateProjectDto: {
    dataType: "refObject",
    properties: {
      id: { dataType: "string" },
      name: { dataType: "string" },
      testMatrices: {
        dataType: "array",
        array: {
          dataType: "nestedObjectLiteral",
          nestedProperties: {
            viewPoints: {
              dataType: "array",
              array: {
                dataType: "nestedObjectLiteral",
                nestedProperties: {
                  description: { dataType: "string", required: true },
                  index: { dataType: "double", required: true },
                  name: { dataType: "string", required: true },
                  id: {
                    dataType: "union",
                    subSchemas: [
                      { dataType: "string" },
                      { dataType: "enum", enums: [null] },
                    ],
                    required: true,
                  },
                },
              },
            },
            groups: {
              dataType: "array",
              array: {
                dataType: "nestedObjectLiteral",
                nestedProperties: {
                  testTargets: {
                    dataType: "array",
                    array: {
                      dataType: "nestedObjectLiteral",
                      nestedProperties: {
                        plans: {
                          dataType: "array",
                          array: {
                            dataType: "nestedObjectLiteral",
                            nestedProperties: {
                              value: { dataType: "double", required: true },
                              viewPointId: {
                                dataType: "union",
                                subSchemas: [
                                  { dataType: "string" },
                                  { dataType: "enum", enums: [null] },
                                ],
                                required: true,
                              },
                            },
                          },
                          required: true,
                        },
                        index: { dataType: "double", required: true },
                        name: { dataType: "string", required: true },
                        id: { dataType: "string", required: true },
                      },
                    },
                    required: true,
                  },
                  index: { dataType: "double", required: true },
                  name: { dataType: "string", required: true },
                  id: { dataType: "string", required: true },
                },
              },
              required: true,
            },
            index: { dataType: "double", required: true },
            name: { dataType: "string", required: true },
            id: { dataType: "string", required: true },
          },
        },
        required: true,
      },
      stories: {
        dataType: "array",
        array: { dataType: "refObject", ref: "StoryDetails" },
        required: true,
      },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  DailyTestProgress: {
    dataType: "refAlias",
    type: {
      dataType: "nestedObjectLiteral",
      nestedProperties: {
        storyProgresses: {
          dataType: "array",
          array: {
            dataType: "nestedObjectLiteral",
            nestedProperties: {
              incompletedSessionNumber: { dataType: "double", required: true },
              completedSessionNumber: { dataType: "double", required: true },
              plannedSessionNumber: { dataType: "double", required: true },
              viewPointId: { dataType: "string", required: true },
              testTargetId: { dataType: "string", required: true },
              testTargetGroupId: { dataType: "string", required: true },
              testMatrixId: { dataType: "string", required: true },
              storyId: { dataType: "string", required: true },
            },
          },
          required: true,
        },
        date: { dataType: "string", required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  GetTestProgressResponse: {
    dataType: "refAlias",
    type: { ref: "DailyTestProgress", validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  TestResultViewOption: {
    dataType: "refAlias",
    type: {
      dataType: "nestedObjectLiteral",
      nestedProperties: {
        node: {
          dataType: "nestedObjectLiteral",
          nestedProperties: {
            definitions: {
              dataType: "array",
              array: {
                dataType: "nestedObjectLiteral",
                nestedProperties: {
                  conditions: {
                    dataType: "array",
                    array: {
                      dataType: "nestedObjectLiteral",
                      nestedProperties: {
                        value: { dataType: "string", required: true },
                        method: {
                          dataType: "union",
                          subSchemas: [
                            { dataType: "enum", enums: ["contains"] },
                            { dataType: "enum", enums: ["equals"] },
                            { dataType: "enum", enums: ["regex"] },
                          ],
                          required: true,
                        },
                        target: {
                          dataType: "union",
                          subSchemas: [
                            { dataType: "enum", enums: ["title"] },
                            { dataType: "enum", enums: ["url"] },
                            { dataType: "enum", enums: ["keyword"] },
                          ],
                          required: true,
                        },
                      },
                    },
                    required: true,
                  },
                  name: { dataType: "string", required: true },
                },
              },
              required: true,
            },
            unit: {
              dataType: "union",
              subSchemas: [
                { dataType: "enum", enums: ["title"] },
                { dataType: "enum", enums: ["url"] },
              ],
              required: true,
            },
          },
          required: true,
        },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  TestScriptOption: {
    dataType: "refAlias",
    type: {
      dataType: "nestedObjectLiteral",
      nestedProperties: {
        view: { ref: "TestResultViewOption", required: true },
        testData: {
          dataType: "nestedObjectLiteral",
          nestedProperties: {
            maxGeneration: { dataType: "double", required: true },
            useDataDriven: { dataType: "boolean", required: true },
          },
          required: true,
        },
        optimized: { dataType: "boolean", required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CreateTestScriptDto: {
    dataType: "refAlias",
    type: { ref: "TestScriptOption", validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Session: {
    dataType: "refAlias",
    type: {
      dataType: "nestedObjectLiteral",
      nestedProperties: {
        testingTime: { dataType: "double", required: true },
        testerName: { dataType: "string", required: true },
        testResultFiles: {
          dataType: "array",
          array: {
            dataType: "nestedObjectLiteral",
            nestedProperties: {
              id: { dataType: "string", required: true },
              name: { dataType: "string", required: true },
            },
          },
          required: true,
        },
        testItem: { dataType: "string", required: true },
        name: { dataType: "string", required: true },
        memo: { dataType: "string", required: true },
        issues: {
          dataType: "array",
          array: {
            dataType: "nestedObjectLiteral",
            nestedProperties: {
              imageFilePath: { dataType: "string" },
              value: { dataType: "string", required: true },
              type: { dataType: "string", required: true },
              ticketId: { dataType: "string", required: true },
              status: { dataType: "string", required: true },
              source: {
                dataType: "nestedObjectLiteral",
                nestedProperties: {
                  type: { dataType: "string", required: true },
                  index: { dataType: "double", required: true },
                },
                required: true,
              },
              details: { dataType: "string", required: true },
            },
          },
          required: true,
        },
        isDone: { dataType: "boolean", required: true },
        doneDate: { dataType: "string", required: true },
        attachedFiles: {
          dataType: "array",
          array: {
            dataType: "nestedObjectLiteral",
            nestedProperties: {
              fileUrl: { dataType: "string", required: true },
              name: { dataType: "string", required: true },
            },
          },
          required: true,
        },
        id: { dataType: "string", required: true },
        index: { dataType: "double", required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  PostSessionResponse: {
    dataType: "refAlias",
    type: { ref: "Session", validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  PatchSessionResponse: {
    dataType: "refAlias",
    type: { ref: "Session", validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  PatchSessionDto: {
    dataType: "refObject",
    properties: {
      attachedFiles: {
        dataType: "array",
        array: {
          dataType: "nestedObjectLiteral",
          nestedProperties: {
            fileData: { dataType: "string" },
            fileUrl: { dataType: "string" },
            name: { dataType: "string", required: true },
          },
        },
      },
      doneDate: { dataType: "string" },
      isDone: { dataType: "boolean" },
      issues: {
        dataType: "array",
        array: {
          dataType: "nestedObjectLiteral",
          nestedProperties: {
            imageFilePath: { dataType: "string" },
            value: { dataType: "string", required: true },
            type: { dataType: "string", required: true },
            ticketId: { dataType: "string", required: true },
            status: { dataType: "string", required: true },
            source: {
              dataType: "nestedObjectLiteral",
              nestedProperties: {
                type: { dataType: "string", required: true },
                index: { dataType: "double", required: true },
              },
              required: true,
            },
            details: { dataType: "string", required: true },
          },
        },
      },
      memo: { dataType: "string" },
      name: { dataType: "string" },
      testItem: { dataType: "string" },
      testResultFiles: {
        dataType: "array",
        array: {
          dataType: "nestedObjectLiteral",
          nestedProperties: {
            id: { dataType: "string", required: true },
            name: { dataType: "string", required: true },
          },
        },
      },
      testerName: { dataType: "string" },
      testingTime: { dataType: "double" },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CreateResponse: {
    dataType: "refObject",
    properties: {
      url: { dataType: "string", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CreateTestResultExportDto: {
    dataType: "refObject",
    properties: {
      temp: { dataType: "boolean", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CreateTestResultImportDto: {
    dataType: "refObject",
    properties: {
      source: {
        dataType: "nestedObjectLiteral",
        nestedProperties: {
          testResultFileUrl: { dataType: "string", required: true },
        },
        required: true,
      },
      dest: {
        dataType: "nestedObjectLiteral",
        nestedProperties: { testResultId: { dataType: "string" } },
      },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  ListTestResultResponse: {
    dataType: "refObject",
    properties: {
      id: { dataType: "string", required: true },
      name: { dataType: "string", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  TestResult: {
    dataType: "refObject",
    properties: {
      id: { dataType: "string", required: true },
      name: { dataType: "string", required: true },
      startTimeStamp: { dataType: "double", required: true },
      endTimeStamp: { dataType: "double", required: true },
      initialUrl: { dataType: "string", required: true },
      testSteps: {
        dataType: "array",
        array: {
          dataType: "nestedObjectLiteral",
          nestedProperties: {
            notices: {
              dataType: "array",
              array: {
                dataType: "nestedObjectLiteral",
                nestedProperties: {
                  tags: {
                    dataType: "array",
                    array: { dataType: "string" },
                    required: true,
                  },
                  imageFileUrl: { dataType: "string", required: true },
                  details: { dataType: "string", required: true },
                  value: { dataType: "string", required: true },
                  type: { dataType: "string", required: true },
                  id: { dataType: "string", required: true },
                },
              },
              required: true,
            },
            bugs: {
              dataType: "array",
              array: {
                dataType: "nestedObjectLiteral",
                nestedProperties: {
                  tags: {
                    dataType: "array",
                    array: { dataType: "string" },
                    required: true,
                  },
                  imageFileUrl: { dataType: "string", required: true },
                  details: { dataType: "string", required: true },
                  value: { dataType: "string", required: true },
                  type: { dataType: "string", required: true },
                  id: { dataType: "string", required: true },
                },
              },
              required: true,
            },
            intention: {
              dataType: "union",
              subSchemas: [
                {
                  dataType: "nestedObjectLiteral",
                  nestedProperties: {
                    tags: {
                      dataType: "array",
                      array: { dataType: "string" },
                      required: true,
                    },
                    imageFileUrl: { dataType: "string", required: true },
                    details: { dataType: "string", required: true },
                    value: { dataType: "string", required: true },
                    type: { dataType: "string", required: true },
                    id: { dataType: "string", required: true },
                  },
                },
                { dataType: "enum", enums: [null] },
              ],
              required: true,
            },
            operation: {
              dataType: "nestedObjectLiteral",
              nestedProperties: {
                keywordTexts: {
                  dataType: "array",
                  array: { dataType: "string" },
                },
                inputElements: {
                  dataType: "array",
                  array: {
                    dataType: "nestedObjectLiteral",
                    nestedProperties: {
                      attributes: {
                        dataType: "nestedObjectLiteral",
                        nestedProperties: {},
                        additionalProperties: { dataType: "string" },
                        required: true,
                      },
                      checked: { dataType: "boolean", required: true },
                      value: { dataType: "string", required: true },
                      xpath: { dataType: "string", required: true },
                      text: { dataType: "string", required: true },
                      tagname: { dataType: "string", required: true },
                    },
                  },
                  required: true,
                },
                windowHandle: { dataType: "string", required: true },
                timestamp: { dataType: "string", required: true },
                imageFileUrl: { dataType: "string", required: true },
                url: { dataType: "string", required: true },
                title: { dataType: "string", required: true },
                elementInfo: {
                  dataType: "union",
                  subSchemas: [
                    {
                      dataType: "nestedObjectLiteral",
                      nestedProperties: {
                        attributes: {
                          dataType: "nestedObjectLiteral",
                          nestedProperties: {},
                          additionalProperties: { dataType: "string" },
                          required: true,
                        },
                        checked: { dataType: "boolean", required: true },
                        value: { dataType: "string", required: true },
                        xpath: { dataType: "string", required: true },
                        text: { dataType: "string", required: true },
                        tagname: { dataType: "string", required: true },
                      },
                    },
                    { dataType: "enum", enums: [null] },
                  ],
                  required: true,
                },
                type: { dataType: "string", required: true },
                input: { dataType: "string", required: true },
              },
              required: true,
            },
            id: { dataType: "string", required: true },
          },
        },
        required: true,
      },
      coverageSources: {
        dataType: "array",
        array: {
          dataType: "nestedObjectLiteral",
          nestedProperties: {
            screenElements: {
              dataType: "array",
              array: {
                dataType: "nestedObjectLiteral",
                nestedProperties: {
                  attributes: {
                    dataType: "nestedObjectLiteral",
                    nestedProperties: {},
                    additionalProperties: { dataType: "string" },
                    required: true,
                  },
                  checked: { dataType: "boolean", required: true },
                  value: { dataType: "string", required: true },
                  xpath: { dataType: "string", required: true },
                  text: { dataType: "string", required: true },
                  tagname: { dataType: "string", required: true },
                },
              },
              required: true,
            },
            url: { dataType: "string", required: true },
            title: { dataType: "string", required: true },
          },
        },
        required: true,
      },
      inputElementInfos: {
        dataType: "array",
        array: {
          dataType: "nestedObjectLiteral",
          nestedProperties: {
            inputElements: {
              dataType: "nestedObjectLiteral",
              nestedProperties: {
                attributes: {
                  dataType: "nestedObjectLiteral",
                  nestedProperties: {},
                  additionalProperties: { dataType: "string" },
                  required: true,
                },
                checked: { dataType: "boolean", required: true },
                value: { dataType: "string", required: true },
                xpath: { dataType: "string", required: true },
                text: { dataType: "string", required: true },
                tagname: { dataType: "string", required: true },
              },
              required: true,
            },
            url: { dataType: "string", required: true },
            title: { dataType: "string", required: true },
          },
        },
        required: true,
      },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  GetTestResultResponse: {
    dataType: "refAlias",
    type: { ref: "TestResult", validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CreateTestResultResponse: {
    dataType: "refObject",
    properties: {
      id: { dataType: "string", required: true },
      name: { dataType: "string", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CreateTestResultDto: {
    dataType: "refObject",
    properties: {
      initialUrl: { dataType: "string" },
      name: { dataType: "string" },
      startTimeStamp: { dataType: "double" },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  PatchTestResultResponse: {
    dataType: "refAlias",
    type: { ref: "TestResult", validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  ElementInfo: {
    dataType: "refObject",
    properties: {
      tagname: { dataType: "string", required: true },
      text: {
        dataType: "union",
        subSchemas: [
          { dataType: "string" },
          { dataType: "enum", enums: [null] },
        ],
      },
      xpath: { dataType: "string", required: true },
      value: { dataType: "any" },
      checked: { dataType: "boolean" },
      attributes: {
        dataType: "nestedObjectLiteral",
        nestedProperties: {},
        additionalProperties: { dataType: "any" },
        required: true,
      },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Operation: {
    dataType: "refObject",
    properties: {
      input: { dataType: "string", required: true },
      type: { dataType: "string", required: true },
      elementInfo: {
        dataType: "union",
        subSchemas: [
          { ref: "ElementInfo" },
          { dataType: "enum", enums: [null] },
        ],
        required: true,
      },
      title: { dataType: "string", required: true },
      url: { dataType: "string", required: true },
      imageFileUrl: { dataType: "string", required: true },
      timestamp: { dataType: "string", required: true },
      inputElements: {
        dataType: "array",
        array: { dataType: "refObject", ref: "ElementInfo" },
        required: true,
      },
      windowHandle: { dataType: "string", required: true },
      keywordTexts: { dataType: "array", array: { dataType: "string" } },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CoverageSource: {
    dataType: "refObject",
    properties: {
      title: { dataType: "string", required: true },
      url: { dataType: "string", required: true },
      screenElements: {
        dataType: "array",
        array: { dataType: "refObject", ref: "ElementInfo" },
        required: true,
      },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  InputElementInfo: {
    dataType: "refObject",
    properties: {
      title: { dataType: "string", required: true },
      url: { dataType: "string", required: true },
      inputElements: {
        dataType: "array",
        array: { dataType: "refObject", ref: "ElementInfo" },
        required: true,
      },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CreateTestStepResponse: {
    dataType: "refAlias",
    type: {
      dataType: "nestedObjectLiteral",
      nestedProperties: {
        inputElementInfo: { ref: "InputElementInfo" },
        coverageSource: { ref: "CoverageSource", required: true },
        operation: { ref: "Operation", required: true },
        id: { dataType: "string", required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CapturedOperation: {
    dataType: "refObject",
    properties: {
      input: { dataType: "string", required: true },
      type: { dataType: "string", required: true },
      elementInfo: {
        dataType: "union",
        subSchemas: [
          { ref: "ElementInfo" },
          { dataType: "enum", enums: [null] },
        ],
        required: true,
      },
      title: { dataType: "string", required: true },
      url: { dataType: "string", required: true },
      imageData: { dataType: "string", required: true },
      windowHandle: { dataType: "string", required: true },
      screenElements: {
        dataType: "array",
        array: { dataType: "refObject", ref: "ElementInfo" },
        required: true,
      },
      inputElements: {
        dataType: "array",
        array: { dataType: "refObject", ref: "ElementInfo" },
        required: true,
      },
      keywordTexts: { dataType: "array", array: { dataType: "string" } },
      timestamp: { dataType: "double", required: true },
      pageSource: { dataType: "string", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CreateTestStepDto: {
    dataType: "refAlias",
    type: { ref: "CapturedOperation", validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  TestStep: {
    dataType: "refObject",
    properties: {
      id: { dataType: "string", required: true },
      operation: { ref: "Operation", required: true },
      intention: {
        dataType: "union",
        subSchemas: [
          { dataType: "string" },
          { dataType: "enum", enums: [null] },
        ],
        required: true,
      },
      bugs: {
        dataType: "array",
        array: { dataType: "string" },
        required: true,
      },
      notices: {
        dataType: "array",
        array: { dataType: "string" },
        required: true,
      },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  GetTestStepResponse: {
    dataType: "refAlias",
    type: { ref: "TestStep", validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  PatchTestStepResponse: {
    dataType: "refAlias",
    type: { ref: "TestStep", validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  PatchTestStepDto: {
    dataType: "refObject",
    properties: {
      intention: {
        dataType: "union",
        subSchemas: [
          { dataType: "string" },
          { dataType: "enum", enums: [null] },
        ],
      },
      bugs: { dataType: "array", array: { dataType: "string" } },
      notices: { dataType: "array", array: { dataType: "string" } },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  TestTarget: {
    dataType: "refObject",
    properties: {
      id: { dataType: "string", required: true },
      name: { dataType: "string", required: true },
      index: { dataType: "double", required: true },
      plans: {
        dataType: "array",
        array: {
          dataType: "nestedObjectLiteral",
          nestedProperties: {
            value: { dataType: "double", required: true },
            viewPointId: { dataType: "string", required: true },
          },
        },
        required: true,
      },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  TestTargetGroup: {
    dataType: "refObject",
    properties: {
      id: { dataType: "string", required: true },
      name: { dataType: "string", required: true },
      index: { dataType: "double", required: true },
      testTargets: {
        dataType: "array",
        array: { dataType: "refObject", ref: "TestTarget" },
        required: true,
      },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  ViewPoint: {
    dataType: "refObject",
    properties: {
      id: { dataType: "string", required: true },
      name: { dataType: "string", required: true },
      index: { dataType: "double" },
      description: { dataType: "string", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  TestMatrix: {
    dataType: "refObject",
    properties: {
      id: { dataType: "string", required: true },
      name: { dataType: "string", required: true },
      index: { dataType: "double", required: true },
      groups: {
        dataType: "array",
        array: { dataType: "refObject", ref: "TestTargetGroup" },
        required: true,
      },
      viewPoints: {
        dataType: "array",
        array: { dataType: "refObject", ref: "ViewPoint" },
        required: true,
      },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  GetTestMatrixResponse: {
    dataType: "refAlias",
    type: { ref: "TestMatrix", validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  PostTestMatrixResponse: {
    dataType: "refAlias",
    type: { ref: "TestMatrix", validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  PatchTestMatrixResponse: {
    dataType: "refAlias",
    type: { ref: "TestMatrix", validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  GetTestTargetGroupResponse: {
    dataType: "refAlias",
    type: { ref: "TestTargetGroup", validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  PostTestTargetGroupResponse: {
    dataType: "refAlias",
    type: { ref: "TestTargetGroup", validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  PatchTestTargetGroupResponse: {
    dataType: "refAlias",
    type: { ref: "TestTargetGroup", validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  GetTestTargetResponse: {
    dataType: "refAlias",
    type: { ref: "TestTarget", validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  PostTestTargetResponse: {
    dataType: "refAlias",
    type: { ref: "TestTarget", validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  PatchTestTargetResponse: {
    dataType: "refAlias",
    type: { ref: "TestTarget", validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  GetViewPointResponse: {
    dataType: "refAlias",
    type: { ref: "ViewPoint", validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  PostViewPointResponse: {
    dataType: "refAlias",
    type: { ref: "ViewPoint", validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  PatchViewPointResponse: {
    dataType: "refAlias",
    type: { ref: "ViewPoint", validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Story: {
    dataType: "refObject",
    properties: {
      id: { dataType: "string", required: true },
      testMatrixId: { dataType: "string", required: true },
      testTargetId: { dataType: "string", required: true },
      viewPointId: { dataType: "string", required: true },
      status: { dataType: "string", required: true },
      index: { dataType: "double", required: true },
      sessions: {
        dataType: "array",
        array: { dataType: "refAlias", ref: "Session" },
        required: true,
      },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  PatchStoryResponse: {
    dataType: "refAlias",
    type: { ref: "Story", validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  PatchStoryDto: {
    dataType: "refObject",
    properties: {
      status: { dataType: "string" },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CreateCompressedImageResponse: {
    dataType: "refObject",
    properties: {
      imageFileUrl: { dataType: "string", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: express.Router) {
  // ###########################################################################################################
  //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
  //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
  // ###########################################################################################################
  app.get(
    "/api/v1/projects/:projectId/configs",

    function ConfigsController_get(request: any, response: any, next: any) {
      const args = {
        projectId: {
          in: "path",
          name: "projectId",
          required: true,
          dataType: "string",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new ConfigsController();

        const promise = controller.get.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.put(
    "/api/v1/projects/:projectId/configs",

    function ConfigsController_update(request: any, response: any, next: any) {
      const args = {
        projectId: {
          in: "path",
          name: "projectId",
          required: true,
          dataType: "string",
        },
        requestBody: {
          in: "body",
          name: "requestBody",
          required: true,
          dataType: "any",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new ConfigsController();

        const promise = controller.update.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v1/projects/:projectId/device-configs",

    function DeviceConfigsController_get(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        projectId: {
          in: "path",
          name: "projectId",
          required: true,
          dataType: "string",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new DeviceConfigsController();

        const promise = controller.get.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.put(
    "/api/v1/projects/:projectId/device-configs",

    function DeviceConfigsController_update(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        projectId: {
          in: "path",
          name: "projectId",
          required: true,
          dataType: "string",
        },
        requestBody: {
          in: "body",
          name: "requestBody",
          required: true,
          dataType: "any",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new DeviceConfigsController();

        const promise = controller.update.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    "/api/v1/upload",

    function FileUploadController_testResultUpload(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        request: {
          in: "request",
          name: "request",
          required: true,
          dataType: "object",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new FileUploadController();

        const promise = controller.testResultUpload.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    "/api/v1/upload-request/test-result",

    function TestResultUploadRequestController_upload(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        requestBody: {
          in: "body",
          name: "requestBody",
          required: true,
          ref: "TestResultUploadRequestDto",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new TestResultUploadRequestController();

        const promise = controller.upload.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    "/api/v1/test-results/:testResultId/notes/:noteId/compressed-image",

    function NoteCompressedImageController_create(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        testResultId: {
          in: "path",
          name: "testResultId",
          required: true,
          dataType: "string",
        },
        noteId: {
          in: "path",
          name: "noteId",
          required: true,
          dataType: "string",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new NoteCompressedImageController();

        const promise = controller.create.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    "/api/v1/test-results/:testResultId/notes",

    function NotesController_create(request: any, response: any, next: any) {
      const args = {
        testResultId: {
          in: "path",
          name: "testResultId",
          required: true,
          dataType: "string",
        },
        requestBody: {
          in: "body",
          name: "requestBody",
          required: true,
          ref: "CreateNoteDto",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new NotesController();

        const promise = controller.create.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v1/test-results/:testResultId/notes/:noteId",

    function NotesController_get(request: any, response: any, next: any) {
      const args = {
        testResultId: {
          in: "path",
          name: "testResultId",
          required: true,
          dataType: "string",
        },
        noteId: {
          in: "path",
          name: "noteId",
          required: true,
          dataType: "string",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new NotesController();

        const promise = controller.get.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.put(
    "/api/v1/test-results/:testResultId/notes/:noteId",

    function NotesController_update(request: any, response: any, next: any) {
      const args = {
        testResultId: {
          in: "path",
          name: "testResultId",
          required: true,
          dataType: "string",
        },
        noteId: {
          in: "path",
          name: "noteId",
          required: true,
          dataType: "string",
        },
        requestBody: {
          in: "body",
          name: "requestBody",
          required: true,
          ref: "UpdateNoteDto",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new NotesController();

        const promise = controller.update.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.delete(
    "/api/v1/test-results/:testResultId/notes/:noteId",

    function NotesController_delete(request: any, response: any, next: any) {
      const args = {
        testResultId: {
          in: "path",
          name: "testResultId",
          required: true,
          dataType: "string",
        },
        noteId: {
          in: "path",
          name: "noteId",
          required: true,
          dataType: "string",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new NotesController();

        const promise = controller.delete.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    "/api/v1/projects/:projectId/export",

    function ProjectExportController_create(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        projectId: {
          in: "path",
          name: "projectId",
          required: true,
          dataType: "string",
        },
        requestBody: {
          in: "body",
          name: "requestBody",
          required: true,
          ref: "CreateProjectExportDto",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new ProjectExportController();

        const promise = controller.create.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v1/imports/projects",

    function ProjectImportController_list(
      request: any,
      response: any,
      next: any
    ) {
      const args = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new ProjectImportController();

        const promise = controller.list.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    "/api/v1/imports/projects",

    function ProjectImportController_create(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        requestBody: {
          in: "body",
          name: "requestBody",
          required: true,
          ref: "CreateProjectImportDto",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new ProjectImportController();

        const promise = controller.create.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v1/projects",

    function ProjectsController_list(request: any, response: any, next: any) {
      const args = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new ProjectsController();

        const promise = controller.list.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    "/api/v1/projects",

    function ProjectsController_create(request: any, response: any, next: any) {
      const args = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new ProjectsController();

        const promise = controller.create.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v1/projects/:projectId",

    function ProjectsController_get(request: any, response: any, next: any) {
      const args = {
        projectId: {
          in: "path",
          name: "projectId",
          required: true,
          dataType: "string",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new ProjectsController();

        const promise = controller.get.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.put(
    "/api/v1/projects/:projectId",

    function ProjectsController_update(request: any, response: any, next: any) {
      const args = {
        projectId: {
          in: "path",
          name: "projectId",
          required: true,
          dataType: "string",
        },
        requestBody: {
          in: "body",
          name: "requestBody",
          required: true,
          ref: "UpdateProjectDto",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new ProjectsController();

        const promise = controller.update.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v1/projects/:projectId/progress",

    function ProjectsController_getTestProgress(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        projectId: {
          in: "path",
          name: "projectId",
          required: true,
          dataType: "string",
        },
        since: { in: "query", name: "since", dataType: "double" },
        until: { in: "query", name: "until", dataType: "double" },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new ProjectsController();

        const promise = controller.getTestProgress.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    "/api/v1/projects/:projectId/test-scripts",

    function ProjectTestScriptsController_create(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        projectId: {
          in: "path",
          name: "projectId",
          required: true,
          dataType: "string",
        },
        requestBody: {
          in: "body",
          name: "requestBody",
          required: true,
          ref: "CreateTestScriptDto",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new ProjectTestScriptsController();

        const promise = controller.create.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v1/server-name",

    function ServerNameController_get(request: any, response: any, next: any) {
      const args = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new ServerNameController();

        const promise = controller.get.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    "/api/v1/projects/:projectId/sessions",

    function SessionsController_post(request: any, response: any, next: any) {
      const args = {
        requestBody: {
          in: "body",
          name: "requestBody",
          required: true,
          dataType: "nestedObjectLiteral",
          nestedProperties: { storyId: { dataType: "string", required: true } },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new SessionsController();

        const promise = controller.post.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.patch(
    "/api/v1/projects/:projectId/sessions/:sessionId",

    function SessionsController_patch(request: any, response: any, next: any) {
      const args = {
        projectId: {
          in: "path",
          name: "projectId",
          required: true,
          dataType: "string",
        },
        sessionId: {
          in: "path",
          name: "sessionId",
          required: true,
          dataType: "string",
        },
        requestBody: {
          in: "body",
          name: "requestBody",
          required: true,
          ref: "PatchSessionDto",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new SessionsController();

        const promise = controller.patch.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.delete(
    "/api/v1/projects/:projectId/sessions/:sessionId",

    function SessionsController_delete(request: any, response: any, next: any) {
      const args = {
        projectId: {
          in: "path",
          name: "projectId",
          required: true,
          dataType: "string",
        },
        sessionId: {
          in: "path",
          name: "sessionId",
          required: true,
          dataType: "string",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new SessionsController();

        const promise = controller.delete.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v1/projects/:projectId/snapshots",

    function SnapshotsController_get(request: any, response: any, next: any) {
      const args = {
        projectId: {
          in: "path",
          name: "projectId",
          required: true,
          dataType: "string",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new SnapshotsController();

        const promise = controller.get.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    "/api/v1/projects/:projectId/snapshots",

    function SnapshotsController_create(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        projectId: {
          in: "path",
          name: "projectId",
          required: true,
          dataType: "string",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new SnapshotsController();

        const promise = controller.create.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    "/api/v1/test-results/:testResultId/export",

    function TestResultExportController_create(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        testResultId: {
          in: "path",
          name: "testResultId",
          required: true,
          dataType: "string",
        },
        requestBody: {
          in: "body",
          name: "requestBody",
          ref: "CreateTestResultExportDto",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new TestResultExportController();

        const promise = controller.create.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v1/imports/test-results",

    function TestResultImportController_list(
      request: any,
      response: any,
      next: any
    ) {
      const args = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new TestResultImportController();

        const promise = controller.list.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    "/api/v1/imports/test-results",

    function TestResultImportController_create(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        requestBody: {
          in: "body",
          name: "requestBody",
          required: true,
          ref: "CreateTestResultImportDto",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new TestResultImportController();

        const promise = controller.create.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v1/test-results",

    function TestResultsController_list(
      request: any,
      response: any,
      next: any
    ) {
      const args = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new TestResultsController();

        const promise = controller.list.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v1/test-results/:testResultId",

    function TestResultsController_get(request: any, response: any, next: any) {
      const args = {
        testResultId: {
          in: "path",
          name: "testResultId",
          required: true,
          dataType: "string",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new TestResultsController();

        const promise = controller.get.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    "/api/v1/test-results",

    function TestResultsController_create(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        requestBody: {
          in: "body",
          name: "requestBody",
          required: true,
          ref: "CreateTestResultDto",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new TestResultsController();

        const promise = controller.create.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.patch(
    "/api/v1/test-results/:testResultId",

    function TestResultsController_patch(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        testResultId: {
          in: "path",
          name: "testResultId",
          required: true,
          dataType: "string",
        },
        requestBody: {
          in: "body",
          name: "requestBody",
          required: true,
          dataType: "nestedObjectLiteral",
          nestedProperties: {
            initialUrl: { dataType: "string" },
            startTime: { dataType: "double" },
            name: { dataType: "string" },
          },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new TestResultsController();

        const promise = controller.patch.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.delete(
    "/api/v1/test-results/:testResultId",

    function TestResultsController_delete(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        testResultId: {
          in: "path",
          name: "testResultId",
          required: true,
          dataType: "string",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new TestResultsController();

        const promise = controller.delete.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    "/api/v1/test-results/:testResultId/test-scripts",

    function TestScriptsController_create(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        testResultId: {
          in: "path",
          name: "testResultId",
          required: true,
          dataType: "string",
        },
        requestBody: {
          in: "body",
          name: "requestBody",
          required: true,
          ref: "CreateTestScriptDto",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new TestScriptsController();

        const promise = controller.create.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    "/api/v1/test-results/:testResultId/test-steps",

    function TestStepsController_create(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        testResultId: {
          in: "path",
          name: "testResultId",
          required: true,
          dataType: "string",
        },
        requestBody: {
          in: "body",
          name: "requestBody",
          required: true,
          ref: "CreateTestStepDto",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new TestStepsController();

        const promise = controller.create.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v1/test-results/:testResultId/test-steps/:testStepId",

    function TestStepsController_get(request: any, response: any, next: any) {
      const args = {
        testResultId: {
          in: "path",
          name: "testResultId",
          required: true,
          dataType: "string",
        },
        testStepId: {
          in: "path",
          name: "testStepId",
          required: true,
          dataType: "string",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new TestStepsController();

        const promise = controller.get.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.patch(
    "/api/v1/test-results/:testResultId/test-steps/:testStepId",

    function TestStepsController_patch(request: any, response: any, next: any) {
      const args = {
        testResultId: {
          in: "path",
          name: "testResultId",
          required: true,
          dataType: "string",
        },
        testStepId: {
          in: "path",
          name: "testStepId",
          required: true,
          dataType: "string",
        },
        requestBody: {
          in: "body",
          name: "requestBody",
          required: true,
          ref: "PatchTestStepDto",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new TestStepsController();

        const promise = controller.patch.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v1/test-results/:testResultId/screenshots",

    function ScreenshotsController_get(request: any, response: any, next: any) {
      const args = {
        testResultId: {
          in: "path",
          name: "testResultId",
          required: true,
          dataType: "string",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new ScreenshotsController();

        const promise = controller.get.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v1/test-matrices/:testMatrixId",

    function TestMatricesController_get(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        testMatrixId: {
          in: "path",
          name: "testMatrixId",
          required: true,
          dataType: "string",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new TestMatricesController();

        const promise = controller.get.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    "/api/v1/test-matrices",

    function TestMatricesController_post(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        body: {
          in: "body",
          name: "body",
          required: true,
          dataType: "nestedObjectLiteral",
          nestedProperties: {
            name: { dataType: "string", required: true },
            projectId: { dataType: "string", required: true },
          },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new TestMatricesController();

        const promise = controller.post.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.patch(
    "/api/v1/test-matrices/:testMatrixId",

    function TestMatricesController_patch(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        testMatrixId: {
          in: "path",
          name: "testMatrixId",
          required: true,
          dataType: "string",
        },
        body: {
          in: "body",
          name: "body",
          required: true,
          dataType: "nestedObjectLiteral",
          nestedProperties: { name: { dataType: "string", required: true } },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new TestMatricesController();

        const promise = controller.patch.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.delete(
    "/api/v1/test-matrices/:testMatrixId",

    function TestMatricesController_delete(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        testMatrixId: {
          in: "path",
          name: "testMatrixId",
          required: true,
          dataType: "string",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new TestMatricesController();

        const promise = controller.delete.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v1/test-target-groups/:testTargetGroupId",

    function TestTargetGroupsController_get(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        testTargetGroupId: {
          in: "path",
          name: "testTargetGroupId",
          required: true,
          dataType: "string",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new TestTargetGroupsController();

        const promise = controller.get.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    "/api/v1/test-target-groups",

    function TestTargetGroupsController_post(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        body: {
          in: "body",
          name: "body",
          required: true,
          dataType: "nestedObjectLiteral",
          nestedProperties: {
            name: { dataType: "string", required: true },
            testMatrixId: { dataType: "string", required: true },
          },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new TestTargetGroupsController();

        const promise = controller.post.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.patch(
    "/api/v1/test-target-groups/:testTargetGroupId",

    function TestTargetGroupsController_patch(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        testTargetGroupId: {
          in: "path",
          name: "testTargetGroupId",
          required: true,
          dataType: "string",
        },
        body: {
          in: "body",
          name: "body",
          required: true,
          dataType: "nestedObjectLiteral",
          nestedProperties: { name: { dataType: "string", required: true } },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new TestTargetGroupsController();

        const promise = controller.patch.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.delete(
    "/api/v1/test-target-groups/:testTargetGroupId",

    function TestTargetGroupsController_delete(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        testTargetGroupId: {
          in: "path",
          name: "testTargetGroupId",
          required: true,
          dataType: "string",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new TestTargetGroupsController();

        const promise = controller.delete.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v1/test-targets/:testTargetId",

    function TestTargetsController_get(request: any, response: any, next: any) {
      const args = {
        testTargetId: {
          in: "path",
          name: "testTargetId",
          required: true,
          dataType: "string",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new TestTargetsController();

        const promise = controller.get.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    "/api/v1/test-targets",

    function TestTargetsController_post(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        body: {
          in: "body",
          name: "body",
          required: true,
          dataType: "nestedObjectLiteral",
          nestedProperties: {
            name: { dataType: "string", required: true },
            testTargetGroupId: { dataType: "string", required: true },
          },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new TestTargetsController();

        const promise = controller.post.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.patch(
    "/api/v1/test-targets/:testTargetId",

    function TestTargetsController_patch(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        testTargetId: {
          in: "path",
          name: "testTargetId",
          required: true,
          dataType: "string",
        },
        body: {
          in: "body",
          name: "body",
          required: true,
          dataType: "nestedObjectLiteral",
          nestedProperties: {
            plans: {
              dataType: "array",
              array: {
                dataType: "nestedObjectLiteral",
                nestedProperties: {
                  value: { dataType: "double", required: true },
                  viewPointId: { dataType: "string", required: true },
                },
              },
            },
            index: { dataType: "double" },
            name: { dataType: "string" },
          },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new TestTargetsController();

        const promise = controller.patch.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.delete(
    "/api/v1/test-targets/:testTargetId",

    function TestTargetsController_delete(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        testTargetId: {
          in: "path",
          name: "testTargetId",
          required: true,
          dataType: "string",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new TestTargetsController();

        const promise = controller.delete.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v1/view-points/:viewPointId",

    function ViewPointsController_get(request: any, response: any, next: any) {
      const args = {
        viewPointId: {
          in: "path",
          name: "viewPointId",
          required: true,
          dataType: "string",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new ViewPointsController();

        const promise = controller.get.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    "/api/v1/view-points",

    function ViewPointsController_post(request: any, response: any, next: any) {
      const args = {
        body: {
          in: "body",
          name: "body",
          required: true,
          dataType: "nestedObjectLiteral",
          nestedProperties: {
            description: { dataType: "string", required: true },
            index: { dataType: "double", required: true },
            name: { dataType: "string", required: true },
            testMatrixId: { dataType: "string", required: true },
          },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new ViewPointsController();

        const promise = controller.post.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.patch(
    "/api/v1/view-points/:viewPointId",

    function ViewPointsController_patch(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        viewPointId: {
          in: "path",
          name: "viewPointId",
          required: true,
          dataType: "string",
        },
        body: {
          in: "body",
          name: "body",
          required: true,
          dataType: "nestedObjectLiteral",
          nestedProperties: {
            index: { dataType: "double" },
            description: { dataType: "string" },
            name: { dataType: "string" },
          },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new ViewPointsController();

        const promise = controller.patch.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.delete(
    "/api/v1/view-points/:viewPointId",

    function ViewPointsController_delete(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        viewPointId: {
          in: "path",
          name: "viewPointId",
          required: true,
          dataType: "string",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new ViewPointsController();

        const promise = controller.delete.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.patch(
    "/api/v1/stories/:storyId",

    function StoriesController_patch(request: any, response: any, next: any) {
      const args = {
        storyId: {
          in: "path",
          name: "storyId",
          required: true,
          dataType: "string",
        },
        requestBody: {
          in: "body",
          name: "requestBody",
          required: true,
          ref: "PatchStoryDto",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new StoriesController();

        const promise = controller.patch.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    "/api/v1/test-results/:testResultId/test-steps/:testStepId/compressed-image",

    function CompressedImageController_create(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        testResultId: {
          in: "path",
          name: "testResultId",
          required: true,
          dataType: "string",
        },
        testStepId: {
          in: "path",
          name: "testStepId",
          required: true,
          dataType: "string",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new CompressedImageController();

        const promise = controller.create.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function isController(object: any): object is Controller {
    return (
      "getHeaders" in object && "getStatus" in object && "setStatus" in object
    );
  }

  function promiseHandler(
    controllerObj: any,
    promise: any,
    response: any,
    successStatus: any,
    next: any
  ) {
    return Promise.resolve(promise)
      .then((data: any) => {
        let statusCode = successStatus;
        let headers;
        if (isController(controllerObj)) {
          headers = controllerObj.getHeaders();
          statusCode = controllerObj.getStatus() || statusCode;
        }

        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

        returnHandler(response, statusCode, data, headers);
      })
      .catch((error: any) => next(error));
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function returnHandler(
    response: any,
    statusCode?: number,
    data?: any,
    headers: any = {}
  ) {
    if (response.headersSent) {
      return;
    }
    Object.keys(headers).forEach((name: string) => {
      response.set(name, headers[name]);
    });
    if (
      data &&
      typeof data.pipe === "function" &&
      data.readable &&
      typeof data._read === "function"
    ) {
      data.pipe(response);
    } else if (data !== null && data !== undefined) {
      response.status(statusCode || 200).json(data);
    } else {
      response.status(statusCode || 204).end();
    }
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function responder(
    response: any
  ): TsoaResponse<HttpStatusCodeLiteral, unknown> {
    return function (status, data, headers) {
      returnHandler(response, status, data, headers);
    };
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function getValidatedArgs(args: any, request: any, response: any): any[] {
    const fieldErrors: FieldErrors = {};
    const values = Object.keys(args).map((key) => {
      const name = args[key].name;
      switch (args[key].in) {
        case "request":
          return request;
        case "query":
          return validationService.ValidateParam(
            args[key],
            request.query[name],
            name,
            fieldErrors,
            undefined,
            { noImplicitAdditionalProperties: "throw-on-extras" }
          );
        case "path":
          return validationService.ValidateParam(
            args[key],
            request.params[name],
            name,
            fieldErrors,
            undefined,
            { noImplicitAdditionalProperties: "throw-on-extras" }
          );
        case "header":
          return validationService.ValidateParam(
            args[key],
            request.header(name),
            name,
            fieldErrors,
            undefined,
            { noImplicitAdditionalProperties: "throw-on-extras" }
          );
        case "body":
          return validationService.ValidateParam(
            args[key],
            request.body,
            name,
            fieldErrors,
            undefined,
            { noImplicitAdditionalProperties: "throw-on-extras" }
          );
        case "body-prop":
          return validationService.ValidateParam(
            args[key],
            request.body[name],
            name,
            fieldErrors,
            "body.",
            { noImplicitAdditionalProperties: "throw-on-extras" }
          );
        case "formData":
          if (args[key].dataType === "file") {
            return validationService.ValidateParam(
              args[key],
              request.file,
              name,
              fieldErrors,
              undefined,
              { noImplicitAdditionalProperties: "throw-on-extras" }
            );
          } else if (
            args[key].dataType === "array" &&
            args[key].array.dataType === "file"
          ) {
            return validationService.ValidateParam(
              args[key],
              request.files,
              name,
              fieldErrors,
              undefined,
              { noImplicitAdditionalProperties: "throw-on-extras" }
            );
          } else {
            return validationService.ValidateParam(
              args[key],
              request.body[name],
              name,
              fieldErrors,
              undefined,
              { noImplicitAdditionalProperties: "throw-on-extras" }
            );
          }
        case "res":
          return responder(response);
      }
    });

    if (Object.keys(fieldErrors).length > 0) {
      throw new ValidateError(fieldErrors, "");
    }
    return values;
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
