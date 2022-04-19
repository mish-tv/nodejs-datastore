import * as gax from 'google-gax';
import { Callback, CallOptions, Descriptors, ClientOptions } from 'google-gax';
import * as protos from '../../protos/protos';
/**
 *  Each RPC normalizes the partition IDs of the keys in its input entities,
 *  and always returns entities with keys with normalized partition IDs.
 *  This applies to all keys and entities, including those in values, except keys
 *  with both an empty path and an empty or unset partition ID. Normalization of
 *  input keys sets the project ID (if not already set) to the project ID from
 *  the request.
 *
 * @class
 * @memberof v1
 */
export declare class DatastoreClient {
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
    datastoreStub?: Promise<{
        [name: string]: Function;
    }>;
    /**
     * Construct an instance of DatastoreClient.
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
     * Looks up entities by key.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.projectId
     *   Required. The ID of the project against which to make the request.
     * @param {google.datastore.v1.ReadOptions} request.readOptions
     *   The options for this lookup request.
     * @param {number[]} request.keys
     *   Required. Keys of entities to look up.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing [LookupResponse]{@link google.datastore.v1.LookupResponse}.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/datastore.lookup.js</caption>
     * region_tag:datastore_v1_generated_Datastore_Lookup_async
     */
    lookup(request?: protos.google.datastore.v1.ILookupRequest, options?: CallOptions): Promise<[protos.google.datastore.v1.ILookupResponse, protos.google.datastore.v1.ILookupRequest | undefined, {} | undefined]>;
    lookup(request: protos.google.datastore.v1.ILookupRequest, options: CallOptions, callback: Callback<protos.google.datastore.v1.ILookupResponse, protos.google.datastore.v1.ILookupRequest | null | undefined, {} | null | undefined>): void;
    lookup(request: protos.google.datastore.v1.ILookupRequest, callback: Callback<protos.google.datastore.v1.ILookupResponse, protos.google.datastore.v1.ILookupRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Queries for entities.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.projectId
     *   Required. The ID of the project against which to make the request.
     * @param {google.datastore.v1.PartitionId} request.partitionId
     *   Entities are partitioned into subsets, identified by a partition ID.
     *   Queries are scoped to a single partition.
     *   This partition ID is normalized with the standard default context
     *   partition ID.
     * @param {google.datastore.v1.ReadOptions} request.readOptions
     *   The options for this query.
     * @param {google.datastore.v1.Query} request.query
     *   The query to run.
     * @param {google.datastore.v1.GqlQuery} request.gqlQuery
     *   The GQL query to run.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing [RunQueryResponse]{@link google.datastore.v1.RunQueryResponse}.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/datastore.run_query.js</caption>
     * region_tag:datastore_v1_generated_Datastore_RunQuery_async
     */
    runQuery(request?: protos.google.datastore.v1.IRunQueryRequest, options?: CallOptions): Promise<[protos.google.datastore.v1.IRunQueryResponse, protos.google.datastore.v1.IRunQueryRequest | undefined, {} | undefined]>;
    runQuery(request: protos.google.datastore.v1.IRunQueryRequest, options: CallOptions, callback: Callback<protos.google.datastore.v1.IRunQueryResponse, protos.google.datastore.v1.IRunQueryRequest | null | undefined, {} | null | undefined>): void;
    runQuery(request: protos.google.datastore.v1.IRunQueryRequest, callback: Callback<protos.google.datastore.v1.IRunQueryResponse, protos.google.datastore.v1.IRunQueryRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Begins a new transaction.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.projectId
     *   Required. The ID of the project against which to make the request.
     * @param {google.datastore.v1.TransactionOptions} request.transactionOptions
     *   Options for a new transaction.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing [BeginTransactionResponse]{@link google.datastore.v1.BeginTransactionResponse}.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/datastore.begin_transaction.js</caption>
     * region_tag:datastore_v1_generated_Datastore_BeginTransaction_async
     */
    beginTransaction(request?: protos.google.datastore.v1.IBeginTransactionRequest, options?: CallOptions): Promise<[protos.google.datastore.v1.IBeginTransactionResponse, protos.google.datastore.v1.IBeginTransactionRequest | undefined, {} | undefined]>;
    beginTransaction(request: protos.google.datastore.v1.IBeginTransactionRequest, options: CallOptions, callback: Callback<protos.google.datastore.v1.IBeginTransactionResponse, protos.google.datastore.v1.IBeginTransactionRequest | null | undefined, {} | null | undefined>): void;
    beginTransaction(request: protos.google.datastore.v1.IBeginTransactionRequest, callback: Callback<protos.google.datastore.v1.IBeginTransactionResponse, protos.google.datastore.v1.IBeginTransactionRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Commits a transaction, optionally creating, deleting or modifying some
     * entities.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.projectId
     *   Required. The ID of the project against which to make the request.
     * @param {google.datastore.v1.CommitRequest.Mode} request.mode
     *   The type of commit to perform. Defaults to `TRANSACTIONAL`.
     * @param {Buffer} request.transaction
     *   The identifier of the transaction associated with the commit. A
     *   transaction identifier is returned by a call to
     *   {@link google.datastore.v1.Datastore.BeginTransaction|Datastore.BeginTransaction}.
     * @param {number[]} request.mutations
     *   The mutations to perform.
     *
     *   When mode is `TRANSACTIONAL`, mutations affecting a single entity are
     *   applied in order. The following sequences of mutations affecting a single
     *   entity are not permitted in a single `Commit` request:
     *
     *   - `insert` followed by `insert`
     *   - `update` followed by `insert`
     *   - `upsert` followed by `insert`
     *   - `delete` followed by `update`
     *
     *   When mode is `NON_TRANSACTIONAL`, no two mutations may affect a single
     *   entity.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing [CommitResponse]{@link google.datastore.v1.CommitResponse}.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/datastore.commit.js</caption>
     * region_tag:datastore_v1_generated_Datastore_Commit_async
     */
    commit(request?: protos.google.datastore.v1.ICommitRequest, options?: CallOptions): Promise<[protos.google.datastore.v1.ICommitResponse, protos.google.datastore.v1.ICommitRequest | undefined, {} | undefined]>;
    commit(request: protos.google.datastore.v1.ICommitRequest, options: CallOptions, callback: Callback<protos.google.datastore.v1.ICommitResponse, protos.google.datastore.v1.ICommitRequest | null | undefined, {} | null | undefined>): void;
    commit(request: protos.google.datastore.v1.ICommitRequest, callback: Callback<protos.google.datastore.v1.ICommitResponse, protos.google.datastore.v1.ICommitRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Rolls back a transaction.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.projectId
     *   Required. The ID of the project against which to make the request.
     * @param {Buffer} request.transaction
     *   Required. The transaction identifier, returned by a call to
     *   {@link google.datastore.v1.Datastore.BeginTransaction|Datastore.BeginTransaction}.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing [RollbackResponse]{@link google.datastore.v1.RollbackResponse}.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/datastore.rollback.js</caption>
     * region_tag:datastore_v1_generated_Datastore_Rollback_async
     */
    rollback(request?: protos.google.datastore.v1.IRollbackRequest, options?: CallOptions): Promise<[protos.google.datastore.v1.IRollbackResponse, protos.google.datastore.v1.IRollbackRequest | undefined, {} | undefined]>;
    rollback(request: protos.google.datastore.v1.IRollbackRequest, options: CallOptions, callback: Callback<protos.google.datastore.v1.IRollbackResponse, protos.google.datastore.v1.IRollbackRequest | null | undefined, {} | null | undefined>): void;
    rollback(request: protos.google.datastore.v1.IRollbackRequest, callback: Callback<protos.google.datastore.v1.IRollbackResponse, protos.google.datastore.v1.IRollbackRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Allocates IDs for the given keys, which is useful for referencing an entity
     * before it is inserted.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.projectId
     *   Required. The ID of the project against which to make the request.
     * @param {number[]} request.keys
     *   Required. A list of keys with incomplete key paths for which to allocate IDs.
     *   No key may be reserved/read-only.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing [AllocateIdsResponse]{@link google.datastore.v1.AllocateIdsResponse}.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/datastore.allocate_ids.js</caption>
     * region_tag:datastore_v1_generated_Datastore_AllocateIds_async
     */
    allocateIds(request?: protos.google.datastore.v1.IAllocateIdsRequest, options?: CallOptions): Promise<[protos.google.datastore.v1.IAllocateIdsResponse, protos.google.datastore.v1.IAllocateIdsRequest | undefined, {} | undefined]>;
    allocateIds(request: protos.google.datastore.v1.IAllocateIdsRequest, options: CallOptions, callback: Callback<protos.google.datastore.v1.IAllocateIdsResponse, protos.google.datastore.v1.IAllocateIdsRequest | null | undefined, {} | null | undefined>): void;
    allocateIds(request: protos.google.datastore.v1.IAllocateIdsRequest, callback: Callback<protos.google.datastore.v1.IAllocateIdsResponse, protos.google.datastore.v1.IAllocateIdsRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Prevents the supplied keys' IDs from being auto-allocated by Cloud
     * Datastore.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.projectId
     *   Required. The ID of the project against which to make the request.
     * @param {string} request.databaseId
     *   If not empty, the ID of the database against which to make the request.
     * @param {number[]} request.keys
     *   Required. A list of keys with complete key paths whose numeric IDs should not be
     *   auto-allocated.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing [ReserveIdsResponse]{@link google.datastore.v1.ReserveIdsResponse}.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
     *   for more details and examples.
     * @example <caption>include:samples/generated/v1/datastore.reserve_ids.js</caption>
     * region_tag:datastore_v1_generated_Datastore_ReserveIds_async
     */
    reserveIds(request?: protos.google.datastore.v1.IReserveIdsRequest, options?: CallOptions): Promise<[protos.google.datastore.v1.IReserveIdsResponse, protos.google.datastore.v1.IReserveIdsRequest | undefined, {} | undefined]>;
    reserveIds(request: protos.google.datastore.v1.IReserveIdsRequest, options: CallOptions, callback: Callback<protos.google.datastore.v1.IReserveIdsResponse, protos.google.datastore.v1.IReserveIdsRequest | null | undefined, {} | null | undefined>): void;
    reserveIds(request: protos.google.datastore.v1.IReserveIdsRequest, callback: Callback<protos.google.datastore.v1.IReserveIdsResponse, protos.google.datastore.v1.IReserveIdsRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Terminate the gRPC channel and close the client.
     *
     * The client will no longer be usable and all future behavior is undefined.
     * @returns {Promise} A promise that resolves when the client is closed.
     */
    close(): Promise<void>;
}
