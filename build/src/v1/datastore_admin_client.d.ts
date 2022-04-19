/// <reference types="node" />
import * as gax from 'google-gax';
import { Callback, CallOptions, Descriptors, ClientOptions, LROperation, PaginationCallback } from 'google-gax';
import { Transform } from 'stream';
import * as protos from '../../protos/protos';
/**
 *  Google Cloud Datastore Admin API
 *
 *
 *  The Datastore Admin API provides several admin services for Cloud Datastore.
 *
 *  -----------------------------------------------------------------------------
 *  ## Concepts
 *
 *  Project, namespace, kind, and entity as defined in the Google Cloud Datastore
 *  API.
 *
 *  Operation: An Operation represents work being performed in the background.
 *
 *  EntityFilter: Allows specifying a subset of entities in a project. This is
 *  specified as a combination of kinds and namespaces (either or both of which
 *  may be all).
 *
 *  -----------------------------------------------------------------------------
 *  ## Services
 *
 *  # Export/Import
 *
 *  The Export/Import service provides the ability to copy all or a subset of
 *  entities to/from Google Cloud Storage.
 *
 *  Exported data may be imported into Cloud Datastore for any Google Cloud
 *  Platform project. It is not restricted to the export source project. It is
 *  possible to export from one project and then import into another.
 *
 *  Exported data can also be loaded into Google BigQuery for analysis.
 *
 *  Exports and imports are performed asynchronously. An Operation resource is
 *  created for each export/import. The state (including any errors encountered)
 *  of the export/import may be queried via the Operation resource.
 *
 *  # Index
 *
 *  The index service manages Cloud Datastore composite indexes.
 *
 *  Index creation and deletion are performed asynchronously.
 *  An Operation resource is created for each such asynchronous operation.
 *  The state of the operation (including any errors encountered)
 *  may be queried via the Operation resource.
 *
 *  # Operation
 *
 *  The Operations collection provides a record of actions performed for the
 *  specified project (including any operations in progress). Operations are not
 *  created directly but through calls on other collections or resources.
 *
 *  An operation that is not yet done may be cancelled. The request to cancel is
 *  asynchronous and the operation may continue to run for some time after the
 *  request to cancel is made.
 *
 *  An operation that is done may be deleted so that it is no longer listed as
 *  part of the Operation collection.
 *
 *  ListOperations returns all pending operations, but not completed operations.
 *
 *  Operations are created by service DatastoreAdmin,
 *  but are accessed via service google.longrunning.Operations.
 * @class
 * @memberof v1
 */
export declare class DatastoreAdminClient {
    private _terminated;
    private _opts;
    private _providedCustomServicePath;
    private _gaxModule;
    private _gaxGrpc;
    private _protos;
    private _defaults;
    auth: gax.GoogleAuth;
    descriptors: Descriptors;
    warn: (code: string, message: string, warnType?: string) => void;
    innerApiCalls: {
        [name: string]: Function;
    };
    operationsClient: gax.OperationsClient;
    datastoreAdminStub?: Promise<{
        [name: string]: Function;
    }>;
    /**
     * Construct an instance of DatastoreAdminClient.
     *
     * @param {object} [options] - The configuration object.
     * The options accepted by the constructor are described in detail
     * in [this document](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#creating-the-client-instance).
     * The common options are:
     * @param {object} [options.credentials] - Credentials object.
     * @param {string} [options.credentials.client_email]
     * @param {string} [options.credentials.private_key]
     * @param {string} [options.email] - Account email address. Required when
     *     using a .pem or .p12 keyFilename.
     * @param {string} [options.keyFilename] - Full path to the a .json, .pem, or
     *     .p12 key downloaded from the Google Developers Console. If you provide
     *     a path to a JSON file, the projectId option below is not necessary.
     *     NOTE: .pem and .p12 require you to specify options.email as well.
     * @param {number} [options.port] - The port on which to connect to
     *     the remote host.
     * @param {string} [options.projectId] - The project ID from the Google
     *     Developer's Console, e.g. 'grape-spaceship-123'. We will also check
     *     the environment variable GCLOUD_PROJECT for your project ID. If your
     *     app is running in an environment which supports
     *     {@link https://developers.google.com/identity/protocols/application-default-credentials Application Default Credentials},
     *     your project ID will be detected automatically.
     * @param {string} [options.apiEndpoint] - The domain name of the
     *     API remote host.
     * @param {gax.ClientConfig} [options.clientConfig] - Client configuration override.
     *     Follows the structure of {@link gapicConfig}.
     * @param {boolean} [options.fallback] - Use HTTP fallback mode.
     *     In fallback mode, a special browser-compatible transport implementation is used
     *     instead of gRPC transport. In browser context (if the `window` object is defined)
     *     the fallback mode is enabled automatically; set `options.fallback` to `false`
     *     if you need to override this behavior.
     */
    constructor(opts?: ClientOptions);
    /**
     * Initialize the client.
     * Performs asynchronous operations (such as authentication) and prepares the client.
     * This function will be called automatically when any class method is called for the
     * first time, but if you need to initialize it before calling an actual method,
     * feel free to call initialize() directly.
     *
     * You can await on this method if you want to make sure the client is initialized.
     *
     * @returns {Promise} A promise that resolves to an authenticated service stub.
     */
    initialize(): Promise<{
        [name: string]: Function;
    }>;
    /**
     * The DNS address for this API service.
     * @returns {string} The DNS address for this service.
     */
    static get servicePath(): string;
    /**
     * The DNS address for this API service - same as servicePath(),
     * exists for compatibility reasons.
     * @returns {string} The DNS address for this service.
     */
    static get apiEndpoint(): string;
    /**
     * The port for this API service.
     * @returns {number} The default port for this service.
     */
    static get port(): number;
    /**
     * The scopes needed to make gRPC calls for every method defined
     * in this service.
     * @returns {string[]} List of default scopes.
     */
    static get scopes(): string[];
    getProjectId(): Promise<string>;
    getProjectId(callback: Callback<string, undefined, undefined>): void;
    /**
     * Gets an index.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.projectId
     *   Project ID against which to make the request.
     * @param {string} request.indexId
     *   The resource ID of the index to get.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing [Index]{@link google.datastore.admin.v1.Index}.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/datastore_admin.get_index.js</caption>
     * region_tag:datastore_v1_generated_DatastoreAdmin_GetIndex_async
     */
    getIndex(request?: protos.google.datastore.admin.v1.IGetIndexRequest, options?: CallOptions): Promise<[protos.google.datastore.admin.v1.IIndex, protos.google.datastore.admin.v1.IGetIndexRequest | undefined, {} | undefined]>;
    getIndex(request: protos.google.datastore.admin.v1.IGetIndexRequest, options: CallOptions, callback: Callback<protos.google.datastore.admin.v1.IIndex, protos.google.datastore.admin.v1.IGetIndexRequest | null | undefined, {} | null | undefined>): void;
    getIndex(request: protos.google.datastore.admin.v1.IGetIndexRequest, callback: Callback<protos.google.datastore.admin.v1.IIndex, protos.google.datastore.admin.v1.IGetIndexRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Exports a copy of all or a subset of entities from Google Cloud Datastore
     * to another storage system, such as Google Cloud Storage. Recent updates to
     * entities may not be reflected in the export. The export occurs in the
     * background and its progress can be monitored and managed via the
     * Operation resource that is created. The output of an export may only be
     * used once the associated operation is done. If an export operation is
     * cancelled before completion it may leave partial data behind in Google
     * Cloud Storage.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.projectId
     *   Required. Project ID against which to make the request.
     * @param {number[]} request.labels
     *   Client-assigned labels.
     * @param {google.datastore.admin.v1.EntityFilter} request.entityFilter
     *   Description of what data from the project is included in the export.
     * @param {string} request.outputUrlPrefix
     *   Required. Location for the export metadata and data files.
     *
     *   The full resource URL of the external storage location. Currently, only
     *   Google Cloud Storage is supported. So output_url_prefix should be of the
     *   form: `gs://BUCKET_NAME[/NAMESPACE_PATH]`, where `BUCKET_NAME` is the
     *   name of the Cloud Storage bucket and `NAMESPACE_PATH` is an optional Cloud
     *   Storage namespace path (this is not a Cloud Datastore namespace). For more
     *   information about Cloud Storage namespace paths, see
     *   [Object name
     *   considerations](https://cloud.google.com/storage/docs/naming#object-considerations).
     *
     *   The resulting files will be nested deeper than the specified URL prefix.
     *   The final output URL will be provided in the
     *   {@link google.datastore.admin.v1.ExportEntitiesResponse.output_url|google.datastore.admin.v1.ExportEntitiesResponse.output_url} field. That
     *   value should be used for subsequent ImportEntities operations.
     *
     *   By nesting the data files deeper, the same Cloud Storage bucket can be used
     *   in multiple ExportEntities operations without conflict.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing
     *   a long running operation. Its `promise()` method returns a promise
     *   you can `await` for.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#long-running-operations)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/datastore_admin.export_entities.js</caption>
     * region_tag:datastore_v1_generated_DatastoreAdmin_ExportEntities_async
     */
    exportEntities(request?: protos.google.datastore.admin.v1.IExportEntitiesRequest, options?: CallOptions): Promise<[LROperation<protos.google.datastore.admin.v1.IExportEntitiesResponse, protos.google.datastore.admin.v1.IExportEntitiesMetadata>, protos.google.longrunning.IOperation | undefined, {} | undefined]>;
    exportEntities(request: protos.google.datastore.admin.v1.IExportEntitiesRequest, options: CallOptions, callback: Callback<LROperation<protos.google.datastore.admin.v1.IExportEntitiesResponse, protos.google.datastore.admin.v1.IExportEntitiesMetadata>, protos.google.longrunning.IOperation | null | undefined, {} | null | undefined>): void;
    exportEntities(request: protos.google.datastore.admin.v1.IExportEntitiesRequest, callback: Callback<LROperation<protos.google.datastore.admin.v1.IExportEntitiesResponse, protos.google.datastore.admin.v1.IExportEntitiesMetadata>, protos.google.longrunning.IOperation | null | undefined, {} | null | undefined>): void;
    /**
     * Check the status of the long running operation returned by `exportEntities()`.
     * @param {String} name
     *   The operation name that will be passed.
     * @returns {Promise} - The promise which resolves to an object.
     *   The decoded operation object has result and metadata field to get information from.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#long-running-operations)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/datastore_admin.export_entities.js</caption>
     * region_tag:datastore_v1_generated_DatastoreAdmin_ExportEntities_async
     */
    checkExportEntitiesProgress(name: string): Promise<LROperation<protos.google.datastore.admin.v1.ExportEntitiesResponse, protos.google.datastore.admin.v1.ExportEntitiesMetadata>>;
    /**
     * Imports entities into Google Cloud Datastore. Existing entities with the
     * same key are overwritten. The import occurs in the background and its
     * progress can be monitored and managed via the Operation resource that is
     * created. If an ImportEntities operation is cancelled, it is possible
     * that a subset of the data has already been imported to Cloud Datastore.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.projectId
     *   Required. Project ID against which to make the request.
     * @param {number[]} request.labels
     *   Client-assigned labels.
     * @param {string} request.inputUrl
     *   Required. The full resource URL of the external storage location. Currently, only
     *   Google Cloud Storage is supported. So input_url should be of the form:
     *   `gs://BUCKET_NAME[/NAMESPACE_PATH]/OVERALL_EXPORT_METADATA_FILE`, where
     *   `BUCKET_NAME` is the name of the Cloud Storage bucket, `NAMESPACE_PATH` is
     *   an optional Cloud Storage namespace path (this is not a Cloud Datastore
     *   namespace), and `OVERALL_EXPORT_METADATA_FILE` is the metadata file written
     *   by the ExportEntities operation. For more information about Cloud Storage
     *   namespace paths, see
     *   [Object name
     *   considerations](https://cloud.google.com/storage/docs/naming#object-considerations).
     *
     *   For more information, see
     *   {@link google.datastore.admin.v1.ExportEntitiesResponse.output_url|google.datastore.admin.v1.ExportEntitiesResponse.output_url}.
     * @param {google.datastore.admin.v1.EntityFilter} request.entityFilter
     *   Optionally specify which kinds/namespaces are to be imported. If provided,
     *   the list must be a subset of the EntityFilter used in creating the export,
     *   otherwise a FAILED_PRECONDITION error will be returned. If no filter is
     *   specified then all entities from the export are imported.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing
     *   a long running operation. Its `promise()` method returns a promise
     *   you can `await` for.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#long-running-operations)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/datastore_admin.import_entities.js</caption>
     * region_tag:datastore_v1_generated_DatastoreAdmin_ImportEntities_async
     */
    importEntities(request?: protos.google.datastore.admin.v1.IImportEntitiesRequest, options?: CallOptions): Promise<[LROperation<protos.google.protobuf.IEmpty, protos.google.datastore.admin.v1.IImportEntitiesMetadata>, protos.google.longrunning.IOperation | undefined, {} | undefined]>;
    importEntities(request: protos.google.datastore.admin.v1.IImportEntitiesRequest, options: CallOptions, callback: Callback<LROperation<protos.google.protobuf.IEmpty, protos.google.datastore.admin.v1.IImportEntitiesMetadata>, protos.google.longrunning.IOperation | null | undefined, {} | null | undefined>): void;
    importEntities(request: protos.google.datastore.admin.v1.IImportEntitiesRequest, callback: Callback<LROperation<protos.google.protobuf.IEmpty, protos.google.datastore.admin.v1.IImportEntitiesMetadata>, protos.google.longrunning.IOperation | null | undefined, {} | null | undefined>): void;
    /**
     * Check the status of the long running operation returned by `importEntities()`.
     * @param {String} name
     *   The operation name that will be passed.
     * @returns {Promise} - The promise which resolves to an object.
     *   The decoded operation object has result and metadata field to get information from.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#long-running-operations)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/datastore_admin.import_entities.js</caption>
     * region_tag:datastore_v1_generated_DatastoreAdmin_ImportEntities_async
     */
    checkImportEntitiesProgress(name: string): Promise<LROperation<protos.google.protobuf.Empty, protos.google.datastore.admin.v1.ImportEntitiesMetadata>>;
    /**
     * Creates the specified index.
     * A newly created index's initial state is `CREATING`. On completion of the
     * returned {@link google.longrunning.Operation|google.longrunning.Operation}, the state will be `READY`.
     * If the index already exists, the call will return an `ALREADY_EXISTS`
     * status.
     *
     * During index creation, the process could result in an error, in which
     * case the index will move to the `ERROR` state. The process can be recovered
     * by fixing the data that caused the error, removing the index with
     * {@link google.datastore.admin.v1.DatastoreAdmin.DeleteIndex|delete}, then
     * re-creating the index with [create]
     * [google.datastore.admin.v1.DatastoreAdmin.CreateIndex].
     *
     * Indexes with a single property cannot be created.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.projectId
     *   Project ID against which to make the request.
     * @param {google.datastore.admin.v1.Index} request.index
     *   The index to create. The name and state fields are output only and will be
     *   ignored. Single property indexes cannot be created or deleted.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing
     *   a long running operation. Its `promise()` method returns a promise
     *   you can `await` for.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#long-running-operations)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/datastore_admin.create_index.js</caption>
     * region_tag:datastore_v1_generated_DatastoreAdmin_CreateIndex_async
     */
    createIndex(request?: protos.google.datastore.admin.v1.ICreateIndexRequest, options?: CallOptions): Promise<[LROperation<protos.google.datastore.admin.v1.IIndex, protos.google.datastore.admin.v1.IIndexOperationMetadata>, protos.google.longrunning.IOperation | undefined, {} | undefined]>;
    createIndex(request: protos.google.datastore.admin.v1.ICreateIndexRequest, options: CallOptions, callback: Callback<LROperation<protos.google.datastore.admin.v1.IIndex, protos.google.datastore.admin.v1.IIndexOperationMetadata>, protos.google.longrunning.IOperation | null | undefined, {} | null | undefined>): void;
    createIndex(request: protos.google.datastore.admin.v1.ICreateIndexRequest, callback: Callback<LROperation<protos.google.datastore.admin.v1.IIndex, protos.google.datastore.admin.v1.IIndexOperationMetadata>, protos.google.longrunning.IOperation | null | undefined, {} | null | undefined>): void;
    /**
     * Check the status of the long running operation returned by `createIndex()`.
     * @param {String} name
     *   The operation name that will be passed.
     * @returns {Promise} - The promise which resolves to an object.
     *   The decoded operation object has result and metadata field to get information from.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#long-running-operations)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/datastore_admin.create_index.js</caption>
     * region_tag:datastore_v1_generated_DatastoreAdmin_CreateIndex_async
     */
    checkCreateIndexProgress(name: string): Promise<LROperation<protos.google.datastore.admin.v1.Index, protos.google.datastore.admin.v1.IndexOperationMetadata>>;
    /**
     * Deletes an existing index.
     * An index can only be deleted if it is in a `READY` or `ERROR` state. On
     * successful execution of the request, the index will be in a `DELETING`
     * {@link google.datastore.admin.v1.Index.State|state}. And on completion of the
     * returned {@link google.longrunning.Operation|google.longrunning.Operation}, the index will be removed.
     *
     * During index deletion, the process could result in an error, in which
     * case the index will move to the `ERROR` state. The process can be recovered
     * by fixing the data that caused the error, followed by calling
     * {@link google.datastore.admin.v1.DatastoreAdmin.DeleteIndex|delete} again.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.projectId
     *   Project ID against which to make the request.
     * @param {string} request.indexId
     *   The resource ID of the index to delete.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing
     *   a long running operation. Its `promise()` method returns a promise
     *   you can `await` for.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#long-running-operations)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/datastore_admin.delete_index.js</caption>
     * region_tag:datastore_v1_generated_DatastoreAdmin_DeleteIndex_async
     */
    deleteIndex(request?: protos.google.datastore.admin.v1.IDeleteIndexRequest, options?: CallOptions): Promise<[LROperation<protos.google.datastore.admin.v1.IIndex, protos.google.datastore.admin.v1.IIndexOperationMetadata>, protos.google.longrunning.IOperation | undefined, {} | undefined]>;
    deleteIndex(request: protos.google.datastore.admin.v1.IDeleteIndexRequest, options: CallOptions, callback: Callback<LROperation<protos.google.datastore.admin.v1.IIndex, protos.google.datastore.admin.v1.IIndexOperationMetadata>, protos.google.longrunning.IOperation | null | undefined, {} | null | undefined>): void;
    deleteIndex(request: protos.google.datastore.admin.v1.IDeleteIndexRequest, callback: Callback<LROperation<protos.google.datastore.admin.v1.IIndex, protos.google.datastore.admin.v1.IIndexOperationMetadata>, protos.google.longrunning.IOperation | null | undefined, {} | null | undefined>): void;
    /**
     * Check the status of the long running operation returned by `deleteIndex()`.
     * @param {String} name
     *   The operation name that will be passed.
     * @returns {Promise} - The promise which resolves to an object.
     *   The decoded operation object has result and metadata field to get information from.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#long-running-operations)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/datastore_admin.delete_index.js</caption>
     * region_tag:datastore_v1_generated_DatastoreAdmin_DeleteIndex_async
     */
    checkDeleteIndexProgress(name: string): Promise<LROperation<protos.google.datastore.admin.v1.Index, protos.google.datastore.admin.v1.IndexOperationMetadata>>;
    /**
     * Lists the indexes that match the specified filters.  Datastore uses an
     * eventually consistent query to fetch the list of indexes and may
     * occasionally return stale results.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.projectId
     *   Project ID against which to make the request.
     * @param {string} request.filter
     * @param {number} request.pageSize
     *   The maximum number of items to return.  If zero, then all results will be
     *   returned.
     * @param {string} request.pageToken
     *   The next_page_token value returned from a previous List request, if any.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is Array of [Index]{@link google.datastore.admin.v1.Index}.
     *   The client library will perform auto-pagination by default: it will call the API as many
     *   times as needed and will merge results from all the pages into this array.
     *   Note that it can affect your quota.
     *   We recommend using `listIndexesAsync()`
     *   method described below for async iteration which you can stop as needed.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination)
     *   for more details and examples.
     */
    listIndexes(request?: protos.google.datastore.admin.v1.IListIndexesRequest, options?: CallOptions): Promise<[protos.google.datastore.admin.v1.IIndex[], protos.google.datastore.admin.v1.IListIndexesRequest | null, protos.google.datastore.admin.v1.IListIndexesResponse]>;
    listIndexes(request: protos.google.datastore.admin.v1.IListIndexesRequest, options: CallOptions, callback: PaginationCallback<protos.google.datastore.admin.v1.IListIndexesRequest, protos.google.datastore.admin.v1.IListIndexesResponse | null | undefined, protos.google.datastore.admin.v1.IIndex>): void;
    listIndexes(request: protos.google.datastore.admin.v1.IListIndexesRequest, callback: PaginationCallback<protos.google.datastore.admin.v1.IListIndexesRequest, protos.google.datastore.admin.v1.IListIndexesResponse | null | undefined, protos.google.datastore.admin.v1.IIndex>): void;
    /**
     * Equivalent to `method.name.toCamelCase()`, but returns a NodeJS Stream object.
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.projectId
     *   Project ID against which to make the request.
     * @param {string} request.filter
     * @param {number} request.pageSize
     *   The maximum number of items to return.  If zero, then all results will be
     *   returned.
     * @param {string} request.pageToken
     *   The next_page_token value returned from a previous List request, if any.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Stream}
     *   An object stream which emits an object representing [Index]{@link google.datastore.admin.v1.Index} on 'data' event.
     *   The client library will perform auto-pagination by default: it will call the API as many
     *   times as needed. Note that it can affect your quota.
     *   We recommend using `listIndexesAsync()`
     *   method described below for async iteration which you can stop as needed.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination)
     *   for more details and examples.
     */
    listIndexesStream(request?: protos.google.datastore.admin.v1.IListIndexesRequest, options?: CallOptions): Transform;
    /**
     * Equivalent to `listIndexes`, but returns an iterable object.
     *
     * `for`-`await`-`of` syntax is used with the iterable to get response elements on-demand.
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.projectId
     *   Project ID against which to make the request.
     * @param {string} request.filter
     * @param {number} request.pageSize
     *   The maximum number of items to return.  If zero, then all results will be
     *   returned.
     * @param {string} request.pageToken
     *   The next_page_token value returned from a previous List request, if any.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Object}
     *   An iterable Object that allows [async iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols).
     *   When you iterate the returned iterable, each element will be an object representing
     *   [Index]{@link google.datastore.admin.v1.Index}. The API will be called under the hood as needed, once per the page,
     *   so you can stop the iteration when you don't need more results.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/datastore_admin.list_indexes.js</caption>
     * region_tag:datastore_v1_generated_DatastoreAdmin_ListIndexes_async
     */
    listIndexesAsync(request?: protos.google.datastore.admin.v1.IListIndexesRequest, options?: CallOptions): AsyncIterable<protos.google.datastore.admin.v1.IIndex>;
    /**
     * Terminate the gRPC channel and close the client.
     *
     * The client will no longer be usable and all future behavior is undefined.
     * @returns {Promise} A promise that resolves when the client is closed.
     */
    close(): Promise<void>;
}
