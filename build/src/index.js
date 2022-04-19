"use strict";
/*!
 * Copyright 2018 Google LLC.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.v1 = exports.Transaction = exports.Query = exports.DatastoreRequest = exports.Index = exports.Datastore = exports.Key = void 0;
/**
 * @namespace google
 */
/**
 * @namespace google.datastore.v1
 */
/**
 * @namespace google.protobuf
 */
const arrify = require("arrify");
const extend = require("extend");
const google_gax_1 = require("google-gax");
const is = require("is");
const stream_1 = require("stream");
const entity_1 = require("./entity");
var Key = entity_1.entity.Key;
exports.Key = Key;
const index_class_1 = require("./index-class");
Object.defineProperty(exports, "Index", { enumerable: true, get: function () { return index_class_1.Index; } });
const query_1 = require("./query");
Object.defineProperty(exports, "Query", { enumerable: true, get: function () { return query_1.Query; } });
const request_1 = require("./request");
Object.defineProperty(exports, "DatastoreRequest", { enumerable: true, get: function () { return request_1.DatastoreRequest; } });
const transaction_1 = require("./transaction");
Object.defineProperty(exports, "Transaction", { enumerable: true, get: function () { return transaction_1.Transaction; } });
const promisify_1 = require("@google-cloud/promisify");
const { grpc } = new google_gax_1.GrpcClient();
// Import the clients for each version supported by this package.
const gapic = Object.freeze({
    v1: require('./v1'),
});
const urlSafeKey = new entity_1.entity.URLSafeKey();
/**
 * Idiomatic class for interacting with Cloud Datastore. Uses the lower-level
 * {@link DatastoreClient} class under the hood.
 *
 * In addition to the constructor options shown here, the {@link Datastore}
 * class constructor accepts the same options accepted by
 * {@link DatastoreClient}.
 *
 * <h4>The Datastore Emulator</h4>
 *
 * Make sure you have the <a href="https://cloud.google.com/sdk/downloads">
 * gcloud SDK installed</a>, then run:
 *
 * <pre>
 *   $ gcloud beta emulators datastore start --no-legacy
 * </pre>
 *
 * You will see the following printed:
 *
 * <pre>
 *   [datastore] API endpoint: http://localhost:8005
 *   [datastore] If you are using a library that supports the
 *               DATASTORE_EMULATOR_HOST environment variable, run:
 *   [datastore]
 *   [datastore]   export DATASTORE_EMULATOR_HOST=localhost:8005
 *   [datastore]
 *   [datastore] Dev App Server is now running.
 * </pre>
 *
 * Set that environment variable and your localhost Datastore will
 * automatically be used. You can also pass this address in manually with
 * `apiEndpoint`.
 *
 * Additionally, `DATASTORE_PROJECT_ID` is recognized. If you have this set,
 * you don't need to provide a `projectId`.
 *
 *
 * See {@link https://cloud.google.com/datastore/docs/concepts/overview| Cloud Datastore Concepts Overview}
 *
 * @param {object} [options] Configuration options.
 * @param {string} [options.apiEndpoint] Override the default API endpoint used
 *     to reach Datastore. This is useful for connecting to your local Datastore
 *     server (usually "http://localhost:8080").
 * @param {string} [options.namespace] Namespace to isolate transactions to.
 *
 * @example Import the client library
 * ```
 * const {Datastore} = require('@google-cloud/datastore');
 *
 * ```
 * @example Create a client that uses <a href="https://cloud.google.com/docs/authentication/production#providing_credentials_to_your_application">Application Default Credentials (ADC)</a>:
 * ```
 * const datastore = new Datastore();
 *
 * ```
 * @example Create a client with <a href="https://cloud.google.com/docs/authentication/production#obtaining_and_providing_service_account_credentials_manually">explicit credentials</a>:
 * ```
 * const datastore = new Datastore({
 *   projectId: 'your-project-id',
 *   keyFilename: '/path/to/keyfile.json'
 * });
 *
 * ```
 * @example Retrieving Records
 * ```
 * const {Datastore} = require('@google-cloud/datastore');
 * const datastore = new Datastore();
 *
 * // Records, called "entities" in Datastore, are retrieved by using a key. The
 * // key is more than a numeric identifier, it is a complex data structure that
 * // can be used to model relationships. The simplest key has a string `kind`
 * // value, and either a numeric `id` value, or a string `name` value.
 * //
 * // A single record can be retrieved with {@link Datastore#key} and
 * // {@link Datastore#get}.
 * //-
 * const key = datastore.key(['Company', 'Google']);
 *
 * datastore.get(key, function(err, entity) {
 *   // entity = The record.
 *   // entity[datastore.KEY] = The key for this entity.
 * });
 *
 * //-
 * // <h3>Querying Records</h3>
 * //
 * // Create a query with {@link Datastore#createQuery}.
 * //-
 * const query = datastore.createQuery('Company');
 *
 * //-
 * // Multiple records can be found that match criteria with
 * // {@link Query#filter}.
 * //-
 * query.filter('location', 'CA');
 *
 * //-
 * // Records can also be ordered with {@link Query#order}.
 * //-
 * query.order('name');
 *
 * //-
 * // The number of records returned can be specified with
 * // {@link Query#limit}.
 * //-
 * query.limit(5);
 *
 * //-
 * // Records' key structures can also be queried with
 * // {@link Query#hasAncestor}.
 * //-
 * const ancestorKey = datastore.key(['ParentCompany', 'Alphabet']);
 *
 * query.hasAncestor(ancestorKey);
 *
 * //-
 * // Run the query with {@link Datastore#runQuery}.
 * //-
 * datastore.runQuery(query, (err, entities) => {
 *   // entities = An array of records.
 *
 *   // Access the Key object for an entity.
 *   const firstEntityKey = entities[0][datastore.KEY];
 * });
 *
 * ```
 * @example Paginating Records
 * ```
 * // Imagine building a website that allows a user to sift through hundreds of
 * // their contacts. You'll likely want to only display a subset of these at
 * // once, so you set a limit.
 * //-
 * const express = require('express');
 * const app = express();
 *
 * const NUM_RESULTS_PER_PAGE = 15;
 *
 * app.get('/contacts', (req, res) => {
 *   const query = datastore.createQuery('Contacts')
 *     .limit(NUM_RESULTS_PER_PAGE);
 *
 *   if (req.query.nextPageCursor) {
 *     query.start(req.query.nextPageCursor);
 *   }
 *
 *   datastore.runQuery(query, (err, entities, info) => {
 *     if (err) {
 *       // Error handling omitted.
 *       return;
 *     }
 *
 *     // Respond to the front end with the contacts and the cursoring token
 *     // from the query we just ran.
 *     const frontEndResponse = {
 *       contacts: entities
 *     };
 *
 *     // Check if  more results may exist.
 *     if (info.moreResults !== datastore.NO_MORE_RESULTS) {
 *       frontEndResponse.nextPageCursor = info.endCursor;
 *     }
 *
 *     res.render('contacts', frontEndResponse);
 *   });
 * });
 *
 * ```
 * @example Creating Records
 * ```
 * // New entities can be created and persisted with {@link Datastore#save}.
 * // The entitiy must have a key to be saved. If you don't specify an
 * // identifier for the key, one is generated for you.
 * //
 * // We will create a key with a `name` identifier, "Google".
 * //-
 * const key = datastore.key(['Company', 'Google']);
 *
 * const data = {
 *   name: 'Google',
 *   location: 'CA'
 * };
 *
 * datastore.save({
 *   key: key,
 *   data: data
 * }, (err) => {
 *   if (!err) {
 *     // Record saved successfully.
 *   }
 * });
 *
 * //-
 * // We can verify the data was saved by using {@link Datastore#get}.
 * //-
 * datastore.get(key, (err, entity) => {
 *   // entity = {
 *   //   name: 'Google',
 *   //   location: 'CA'
 *   // }
 * });
 *
 * //-
 * // If we want to update this record, we can modify the data object and re-
 * // save it.
 * //-
 * data.symbol = 'GOOG';
 *
 * datastore.save({
 *   key: key, // defined above (datastore.key(['Company', 'Google']))
 *   data: data
 * }, (err, entity) => {
 *   if (!err) {
 *     // Record updated successfully.
 *   }
 * });
 *
 * ```
 * @example Deleting Records
 * ```
 * // Entities can be removed from Datastore by passing the entity's key object
 * // to {@link Datastore#delete}.
 * //-
 * const key = datastore.key(['Company', 'Google']);
 *
 * datastore.delete(key, (err) => {
 *   if (!err) {
 *     // Record deleted successfully.
 *   }
 * });
 *
 * ```
 * @example Transactions
 * ```
 * // Complex logic can be wrapped in a transaction with
 * // {@link Datastore#transaction}. All queries and updates run within
 * // the transaction will be applied when the `done` function is called.
 * //-
 * const transaction = datastore.transaction();
 *
 * transaction.run((err) => {
 *   if (err) {
 *     // Error handling omitted.
 *   }
 *
 *   const key = datastore.key(['Company', 'Google']);
 *
 *   transaction.get(key, (err, entity) => {
 *     if (err) {
 *       // Error handling omitted.
 *     }
 *
 *     entity.symbol = 'GOOG';
 *
 *     transaction.save(entity);
 *
 *     transaction.commit((err) => {
 *       if (!err) {
 *         // Transaction committed successfully.
 *       }
 *     });
 *   });
 * });
 *
 * ```
 * @example Queries with Ancestors
 * ```
 * const {Datastore} = require('@google-cloud/datastore');
 * const datastore = new Datastore();
 *
 * const customerId1 = 2993844;
 * const customerId2 = 4993882;
 * const customerKey1 = datastore.key(['Customer', customerId1]);
 * const customerKey2 = datastore.key(['Customer', customerId2]);
 * const cookieKey1 = datastore.key(['Customer', customerId1, 'Cookie',
 * 'cookie28839']); // child entity const cookieKey2 =
 * datastore.key(['Customer', customerId1, 'Cookie', 'cookie78984']); // child
 * entity const cookieKey3 = datastore.key(['Customer', customerId2, 'Cookie',
 * 'cookie93911']); // child entity
 *
 * const entities = [];
 *
 * entities.push({
 *   key: customerKey1,
 *   data: {
 *     name: 'Jane Doe',
 *     address: '4848 Liller'
 *   }
 * });
 *
 * entities.push({
 *   key: customerKey2,
 *   data: {
 *     name: 'John Smith',
 *     address: '4848 Pine'
 *   }
 * });
 *
 * entities.push({
 *   key: cookieKey1,
 *   data: {
 *     cookieVal: 'dj83kks88rkld'
 *   }
 * });
 *
 * entities.push({
 *   key: cookieKey2,
 *   data: {
 *     cookieVal: 'sj843ka99s'
 *   }
 * });
 *
 * entities.push({
 *   key: cookieKey3,
 *   data: {
 *     cookieVal: 'otk82k2kw'
 *   }
 * });
 *
 * datastore.upsert(entities);
 *
 * const query = datastore.createQuery().hasAncestor(customerKey1);
 *
 * datastore.runQuery(query, (err, entities) => {
 *   for (let entity of entities) {
 *     console.log(entity[datastore.KEY]);
 *   }
 * });
 *
 * const query2 = datastore.createQuery().hasAncestor(customerKey2);
 *
 * datastore.runQuery(query2, (err, entities) => {
 *   for (let entity of entities) {
 *     console.log(entity[datastore.KEY]);
 *   }
 * });
 *
 * datastore.runQuery(query2, (entities) => {
 *   console.log(entities);
 * });
 * ```
 */
class Datastore extends request_1.DatastoreRequest {
    constructor(options) {
        super();
        this.KEY = Datastore.KEY;
        this.EXCLUDE_FROM_INDEXES = Datastore.EXCLUDE_FROM_INDEXES;
        this.MORE_RESULTS_AFTER_CURSOR = Datastore.MORE_RESULTS_AFTER_CURSOR;
        this.MORE_RESULTS_AFTER_LIMIT = Datastore.MORE_RESULTS_AFTER_LIMIT;
        this.NO_MORE_RESULTS = Datastore.NO_MORE_RESULTS;
        /**
         * {@link DatastoreRequest} class.
         *
         * @name Datastore.DatastoreRequest
         * @see DatastoreRequest
         * @type {constructor}
         */
        this.DatastoreRequest = request_1.DatastoreRequest;
        /**
         * {@link Query} class.
         *
         * @name Datastore.Query
         * @see Query
         * @type {constructor}
         */
        this.Query = query_1.Query;
        /**
         * {@link Transaction} class.
         *
         * @name Datastore.Transaction
         * @see Transaction
         * @type {constructor}
         */
        this.Transaction = transaction_1.Transaction;
        options = options || {};
        this.clients_ = new Map();
        this.datastore = this;
        /**
         * @name Datastore#namespace
         * @type {string}
         */
        this.namespace = options.namespace;
        options.projectId = options.projectId || process.env.DATASTORE_PROJECT_ID;
        this.defaultBaseUrl_ = 'datastore.googleapis.com';
        this.determineBaseUrl_(options.apiEndpoint);
        const scopes = Array.from(new Set([
            ...gapic.v1.DatastoreClient.scopes,
            ...gapic.v1.DatastoreAdminClient.scopes,
        ]));
        this.options = Object.assign({
            libName: 'gccl',
            libVersion: require('../../package.json').version,
            scopes,
            servicePath: this.baseUrl_,
            port: typeof this.port_ === 'number' ? this.port_ : 443,
        }, options);
        if (this.customEndpoint_) {
            this.options.sslCreds = grpc.credentials.createInsecure();
        }
        this.auth = new google_gax_1.GoogleAuth(this.options);
    }
    export(config, callback) {
        const reqOpts = {
            entityFilter: {},
            ...config,
        };
        if (reqOpts.bucket && reqOpts.outputUrlPrefix) {
            throw new Error('Both `bucket` and `outputUrlPrefix` were provided.');
        }
        if (!reqOpts.outputUrlPrefix) {
            if (typeof config.bucket === 'string') {
                reqOpts.outputUrlPrefix = `gs://${config.bucket.replace('gs://', '')}`;
            }
            else if (typeof config.bucket === 'object') {
                reqOpts.outputUrlPrefix = `gs://${config.bucket.name}`;
            }
            else {
                throw new Error('A Bucket object or URL must be provided.');
            }
        }
        if (reqOpts.kinds) {
            if (typeof config.entityFilter === 'object') {
                throw new Error('Both `entityFilter` and `kinds` were provided.');
            }
            reqOpts.entityFilter.kinds = reqOpts.kinds;
        }
        if (reqOpts.namespaces) {
            if (typeof config.entityFilter === 'object') {
                throw new Error('Both `entityFilter` and `namespaces` were provided.');
            }
            reqOpts.entityFilter.namespaceIds = reqOpts.namespaces;
        }
        delete reqOpts.bucket;
        delete reqOpts.gaxOptions;
        delete reqOpts.kinds;
        delete reqOpts.namespaces;
        this.request_({
            client: 'DatastoreAdminClient',
            method: 'exportEntities',
            reqOpts: reqOpts,
            gaxOpts: config.gaxOptions,
        }, 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        callback);
    }
    getIndexes(optionsOrCallback, cb) {
        let options = typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
        const callback = typeof optionsOrCallback === 'function' ? optionsOrCallback : cb;
        options = extend(true, {}, options);
        const gaxOpts = options.gaxOptions || {};
        const reqOpts = {
            pageSize: gaxOpts.pageSize,
            pageToken: gaxOpts.pageToken,
            ...options,
        };
        delete gaxOpts.pageSize;
        delete gaxOpts.pageToken;
        delete reqOpts.autoPaginate;
        delete reqOpts.gaxOptions;
        if (typeof options.autoPaginate === 'boolean' &&
            typeof gaxOpts.autoPaginate === 'undefined') {
            gaxOpts.autoPaginate = options.autoPaginate;
        }
        this.request_({
            client: 'DatastoreAdminClient',
            method: 'listIndexes',
            reqOpts,
            gaxOpts,
        }, 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (err, ...resp) => {
            let indexes = [];
            if (resp[0]) {
                indexes = resp[0].map((index) => {
                    const indexInstance = this.index(index.indexId);
                    indexInstance.metadata = index;
                    return indexInstance;
                });
            }
            const nextQuery = resp[1] ? Object.assign(options, resp[1]) : null;
            const apiResp = resp[2];
            callback(err, indexes, nextQuery, apiResp);
        });
    }
    /**
     * Get all of the indexes in this project as a readable object stream.
     *
     * @param {GetIndexesOptions} [options] Configuration object. See
     *     {@link Datastore#getIndexes} for a complete list of options.
     * @returns {ReadableStream<Index>}
     */
    getIndexesStream(options) {
        const { gaxOptions, ...reqOpts } = options || {};
        return stream_1.pipeline(this.requestStream_({
            client: 'DatastoreAdminClient',
            method: 'listIndexesStream',
            reqOpts,
            gaxOpts: gaxOptions,
        }), new stream_1.Transform({
            objectMode: true,
            transform: (index, enc, next) => {
                const indexInstance = this.index(index.indexId);
                indexInstance.metadata = index;
                next(null, indexInstance);
            },
        }), () => { });
    }
    getProjectId() {
        return this.auth.getProjectId();
    }
    import(config, callback) {
        const reqOpts = {
            entityFilter: {},
            ...config,
        };
        if (config.file && config.inputUrl) {
            throw new Error('Both `file` and `inputUrl` were provided.');
        }
        if (!reqOpts.inputUrl) {
            if (typeof config.file === 'string') {
                reqOpts.inputUrl = `gs://${config.file.replace('gs://', '')}`;
            }
            else if (typeof config.file === 'object') {
                reqOpts.inputUrl = `gs://${config.file.bucket.name}/${config.file.name}`;
            }
            else {
                throw new Error('An input URL must be provided.');
            }
        }
        if (reqOpts.kinds) {
            if (typeof config.entityFilter === 'object') {
                throw new Error('Both `entityFilter` and `kinds` were provided.');
            }
            reqOpts.entityFilter.kinds = reqOpts.kinds;
        }
        if (reqOpts.namespaces) {
            if (typeof config.entityFilter === 'object') {
                throw new Error('Both `entityFilter` and `namespaces` were provided.');
            }
            reqOpts.entityFilter.namespaceIds = reqOpts.namespaces;
        }
        delete reqOpts.file;
        delete reqOpts.gaxOptions;
        delete reqOpts.kinds;
        delete reqOpts.namespaces;
        this.request_({
            client: 'DatastoreAdminClient',
            method: 'importEntities',
            reqOpts: reqOpts,
            gaxOpts: config.gaxOptions,
        }, 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        callback);
    }
    /**
     * Get a reference to an Index.
     *
     * @param {string} id The index name or id.
     * @returns {Index}
     */
    index(id) {
        return new index_class_1.Index(this, id);
    }
    insert(entities, callback) {
        entities = arrify(entities)
            .map(request_1.DatastoreRequest.prepareEntityObject_)
            .map((x) => {
            x.method = 'insert';
            return x;
        });
        this.save(entities, callback);
    }
    save(entities, gaxOptionsOrCallback, cb) {
        entities = arrify(entities);
        const gaxOptions = typeof gaxOptionsOrCallback === 'object' ? gaxOptionsOrCallback : {};
        const callback = typeof gaxOptionsOrCallback === 'function' ? gaxOptionsOrCallback : cb;
        const insertIndexes = {};
        const mutations = [];
        const methods = {
            insert: true,
            update: true,
            upsert: true,
        };
        // Iterate over the entity objects, build a proto from all keys and values,
        // then place in the correct mutation array (insert, update, etc).
        entities
            .map(request_1.DatastoreRequest.prepareEntityObject_)
            .forEach((entityObject, index) => {
            const mutation = {};
            let entityProto = {};
            let method = 'upsert';
            if (entityObject.method) {
                if (methods[entityObject.method]) {
                    method = entityObject.method;
                }
                else {
                    throw new Error('Method ' + entityObject.method + ' not recognized.');
                }
            }
            if (entityObject.excludeLargeProperties) {
                entityObject.excludeFromIndexes = entity_1.entity.findLargeProperties_(entityObject.data, '', entityObject.excludeFromIndexes);
            }
            if (!entity_1.entity.isKeyComplete(entityObject.key)) {
                insertIndexes[index] = true;
            }
            // @TODO remove in @google-cloud/datastore@2.0.0
            // This was replaced with a more efficient mechanism in the top-level
            // `excludeFromIndexes` option.
            if (Array.isArray(entityObject.data)) {
                entityProto.properties = entityObject.data.reduce((acc, data) => {
                    const value = entity_1.entity.encodeValue(data.value, data.name.toString());
                    if (typeof data.excludeFromIndexes === 'boolean') {
                        const excluded = data.excludeFromIndexes;
                        let values = value.arrayValue && value.arrayValue.values;
                        if (values) {
                            values = values.map((x) => {
                                x.excludeFromIndexes = excluded;
                                return x;
                            });
                        }
                        else {
                            value.excludeFromIndexes = data.excludeFromIndexes;
                        }
                    }
                    acc[data.name] = value;
                    return acc;
                }, {});
            }
            else {
                entityProto = entity_1.entity.entityToEntityProto(entityObject);
            }
            entityProto.key = entity_1.entity.keyToKeyProto(entityObject.key);
            mutation[method] = entityProto;
            mutations.push(mutation);
        });
        const reqOpts = {
            mutations,
        };
        function onCommit(err, resp) {
            if (err || !resp) {
                callback(err, resp);
                return;
            }
            arrify(resp.mutationResults).forEach((result, index) => {
                if (!result.key) {
                    return;
                }
                if (insertIndexes[index]) {
                    const id = entity_1.entity.keyFromKeyProto(result.key).id;
                    entities[index].key.id = id;
                }
            });
            callback(null, resp);
        }
        if (this.id) {
            this.requests_.push(reqOpts);
            this.requestCallbacks_.push(onCommit);
            return;
        }
        this.request_({
            client: 'DatastoreClient',
            method: 'commit',
            reqOpts,
            gaxOpts: gaxOptions,
        }, onCommit);
    }
    update(entities, callback) {
        entities = arrify(entities)
            .map(request_1.DatastoreRequest.prepareEntityObject_)
            .map((x) => {
            x.method = 'update';
            return x;
        });
        this.save(entities, callback);
    }
    upsert(entities, callback) {
        entities = arrify(entities)
            .map(request_1.DatastoreRequest.prepareEntityObject_)
            .map((x) => {
            x.method = 'upsert';
            return x;
        });
        this.save(entities, callback);
    }
    /**
     * Helper function to get a Datastore Double object.
     *
     * @param {number} value The double value.
     * @returns {object}
     *
     * @example
     * ```
     * const {Datastore} = require('@google-cloud/datastore');
     * const datastore = new Datastore();
     * const threeDouble = datastore.double(3.0);
     * ```
     */
    static double(value) {
        return new entity_1.entity.Double(value);
    }
    double(value) {
        return Datastore.double(value);
    }
    /**
     * Helper function to check if something is a Datastore Double object.
     *
     * @param {*} value
     * @returns {boolean}
     *
     * @example
     * ```
     * const {Datastore} = require('@google-cloud/datastore');
     * const datastore = new Datastore();
     * datastore.isDouble(0.42); // false
     * datastore.isDouble(datastore.double(0.42)); // true
     * ```
     */
    static isDouble(value) {
        return entity_1.entity.isDsDouble(value);
    }
    isDouble(value) {
        return Datastore.isDouble(value);
    }
    /**
     * Helper function to get a Datastore Geo Point object.
     *
     * @param {object} coordinates Coordinate value.
     * @param {number} coordinates.latitude Latitudinal value.
     * @param {number} coordinates.longitude Longitudinal value.
     * @returns {object}
     *
     * @example
     * ```
     * const {Datastore} = require('@google-cloud/datastore');
     * const datastore = new Datastore();
     * const coordinates = {
     *   latitude: 40.6894,
     *   longitude: -74.0447
     * };
     *
     * const geoPoint = datastore.geoPoint(coordinates);
     *
     * //-
     * // List all companies that are located at 40.123 latitude
     * // and -74.0447 longitude.
     * //-
     * const query = datastore.createQuery('Company');
     * const companyQuery = query
     *   .filter('geoPoint.latitude', datastore.double(40.123))
     *   .filter('geoPoint.longitude', datastore.double(-74.0447));
     * ```
     */
    static geoPoint(coordinates) {
        return new entity_1.entity.GeoPoint(coordinates);
    }
    geoPoint(coordinates) {
        return Datastore.geoPoint(coordinates);
    }
    /**
     * Helper function to check if something is a Datastore Geo Point object.
     *
     * @param {*} value
     * @returns {boolean}
     *
     * @example
     * ```
     * const {Datastore} = require('@google-cloud/datastore');
     * const datastore = new Datastore();
     * const coordinates = {
     *   latitude: 0,
     *   longitude: 0
     * };
     *
     * datastore.isGeoPoint(coordinates); // false
     * datastore.isGeoPoint(datastore.geoPoint(coordinates)); // true
     * ```
     */
    static isGeoPoint(value) {
        return entity_1.entity.isDsGeoPoint(value);
    }
    isGeoPoint(value) {
        return Datastore.isGeoPoint(value);
    }
    /**
     * Helper function to get a Datastore Integer object.
     *
     * This is also useful when using an ID outside the bounds of a JavaScript
     * Number object.
     *
     * @param {number} value The integer value.
     * @returns {object}
     *
     * @example
     * ```
     * const {Datastore} = require('@google-cloud/datastore');
     * const datastore = new Datastore();
     * const sevenInteger = datastore.int(7);
     *
     * //-
     * // Create an Int to support long Key IDs.
     * //-
     * const key = datastore.key([
     *   'Kind',
     *   datastore.int('100000000000001234')
     * ]);
     * ```
     */
    static int(value) {
        return new entity_1.entity.Int(value);
    }
    int(value) {
        return Datastore.int(value);
    }
    /**
     * Helper function to check if something is a Datastore Integer object.
     *
     * @param {*} value
     * @returns {boolean}
     *
     * @example
     * ```
     * const {Datastore} = require('@google-cloud/datastore');
     * const datastore = new Datastore();
     * datastore.isInt(42); // false
     * datastore.isInt(datastore.int(42)); // true
     * ```
     */
    static isInt(value) {
        return entity_1.entity.isDsInt(value);
    }
    isInt(value) {
        return Datastore.isInt(value);
    }
    createQuery(namespaceOrKind, kind) {
        let namespace = namespaceOrKind;
        if (!kind) {
            kind = namespaceOrKind;
            namespace = this.namespace;
        }
        return new query_1.Query(this, namespace, arrify(kind));
    }
    key(options) {
        const keyOptions = is.object(options)
            ? options
            : {
                namespace: this.namespace,
                path: arrify(options),
            };
        return new entity_1.entity.Key(keyOptions);
    }
    /**
     * Helper function to check if something is a Datastore Key object.
     *
     * @param {*} value
     * @returns {boolean}
     *
     * @example
     * ```
     * const {Datastore} = require('@google-cloud/datastore');
     * const datastore = new Datastore();
     * datastore.isKey({path: ['Company', 123]}); // false
     * datastore.isKey(datastore.key(['Company', 123])); // true
     * ```
     */
    static isKey(value) {
        return entity_1.entity.isDsKey(value);
    }
    isKey(value) {
        return Datastore.isKey(value);
    }
    keyToLegacyUrlSafe(key, locationPrefixOrCallback, callback) {
        const locationPrefix = typeof locationPrefixOrCallback === 'string'
            ? locationPrefixOrCallback
            : '';
        callback =
            typeof locationPrefixOrCallback === 'function'
                ? locationPrefixOrCallback
                : callback;
        this.auth.getProjectId((err, projectId) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, urlSafeKey.legacyEncode(projectId, key, locationPrefix));
        });
    }
    /**
     * Helper to convert URL safe key string to entity key object
     *
     * This is intended to work with the "legacy" representation of a
     * datastore "Key" used within Google App Engine (a so-called "Reference").
     *
     * @param {entity.Key} key Entity key object.
     * @param {string} locationPrefix Optional .
     *  The location prefix of an App Engine project ID.
     *  Often this value is 's~', but may also be 'e~', or other location prefixes
     *  currently unknown.
     * @returns {string} Created urlsafe key.
     *
     * @example
     * ```
     * const {Datastore} = require('@google-cloud/datastore');
     * const datastore = new Datastore();
     * const urlSafeKey = 'ag9ncmFzcy1jbHVtcC00NzlyEwsSB0NvbXBhbnkiBkdvb2dsZQw';
     *
     * datastore.keyFromLegacyUrlsafe(key);
     *
     * ```
     */
    keyFromLegacyUrlsafe(key) {
        return urlSafeKey.legacyDecode(key);
    }
    /**
     * Create a new Transaction object.
     *
     * @param {object} [options] Configuration object.
     * @param {string} [options.id] The ID of a previously run transaction.
     * @param {boolean} [options.readOnly=false] A read-only transaction cannot
     *     modify entities.
     * @returns {Transaction}
     *
     * @example
     * ```
     * const {Datastore} = require('@google-cloud/datastore');
     * const datastore = new Datastore();
     * const transaction = datastore.transaction();
     * ```
     */
    transaction(options) {
        return new transaction_1.Transaction(this, options);
    }
    /**
     * Determine the appropriate endpoint to use for API requests. If not
     * explicitly defined, check for the "DATASTORE_EMULATOR_HOST" environment
     * variable, used to connect to a local Datastore server.
     *
     * @private
     *
     * @param {string} customApiEndpoint Custom API endpoint.
     */
    determineBaseUrl_(customApiEndpoint) {
        let baseUrl = this.defaultBaseUrl_;
        const leadingProtocol = new RegExp('^https*://');
        const trailingSlashes = new RegExp('/*$');
        const port = new RegExp(':(\\d+)');
        if (customApiEndpoint) {
            baseUrl = customApiEndpoint;
            this.customEndpoint_ = true;
        }
        else if (process.env.DATASTORE_EMULATOR_HOST) {
            baseUrl = process.env.DATASTORE_EMULATOR_HOST;
            this.customEndpoint_ = true;
        }
        if (port.test(baseUrl)) {
            this.port_ = Number(baseUrl.match(port)[1]);
        }
        this.baseUrl_ = baseUrl
            .replace(leadingProtocol, '')
            .replace(port, '')
            .replace(trailingSlashes, '');
    }
}
exports.Datastore = Datastore;
/**
 * Access the Key from an Entity object.
 *
 * @name Datastore.KEY
 * @type {symbol}
 */
/**
 * Access the Key from an Entity object.
 *
 * @name Datastore#KEY
 * @type {symbol}
 */
Datastore.KEY = entity_1.entity.KEY_SYMBOL;
/**
 * Access the Key from an Entity object.
 *
 * @name Datastore.EXCLUDE_FROM_INDEXES_SYMBOL
 * @type {symbol}
 */
/**
 * Access the Key from an Entity object.
 *
 * @name Datastore#EXCLUDE_FROM_INDEXES_SYMBOL
 * @type {symbol}
 */
Datastore.EXCLUDE_FROM_INDEXES = entity_1.entity.EXCLUDE_FROM_INDEXES_SYMBOL;
/**
 * This is one of three values which may be returned from
 * {@link Datastore#runQuery}, {@link Transaction#runQuery}, and
 * {@link Query#run} as `info.moreResults`.
 *
 * There *may* be more results after the specified end cursor.
 *
 * @type {string}
 */
Datastore.MORE_RESULTS_AFTER_CURSOR = 'MORE_RESULTS_AFTER_CURSOR';
/**
 * This is one of three values which may be returned from
 * {@link Datastore#runQuery}, {@link Transaction#runQuery}, and
 * {@link Query#run} as `info.moreResults`.
 *
 * There *may* be more results after the specified limit.
 *
 * @type {string}
 */
Datastore.MORE_RESULTS_AFTER_LIMIT = 'MORE_RESULTS_AFTER_LIMIT';
/**
 * This is one of three values which may be returned from
 * {@link Datastore#runQuery}, {@link Transaction#runQuery}, and
 * {@link Query#run} as `info.moreResults`.
 *
 * There are no more results left to query for.
 *
 * @type {string}
 */
Datastore.NO_MORE_RESULTS = 'NO_MORE_RESULTS';
/*! Developer Documentation
 *
 * All async methods (except for streams) will return a Promise in the event
 * that a callback is omitted.
 */
promisify_1.promisifyAll(Datastore, {
    exclude: [
        'double',
        'isDouble',
        'geoPoint',
        'getProjectId',
        'isGeoPoint',
        'index',
        'int',
        'isInt',
        'createQuery',
        'key',
        'isKey',
        'keyFromLegacyUrlsafe',
        'transaction',
    ],
});
/**
 * The default export of the `@google-cloud/datastore` package is the
 * {@link Datastore} class.
 *
 * See the {@link Datastore} class for client methods and configuration options.
 *
 * @module {Datastore} @google-cloud/datastore
 * @alias nodejs-datastore
 *
 * @example Install the client library with <a href="https://www.npmjs.com/">npm</a>:
 * ```
 * npm install --save
 * ```
 * @google-cloud/datastore
 *
 * @example Import the client library
 * ```
 * const {Datastore} = require('@google-cloud/datastore');
 *
 * ```
 * @example Create a client that uses <a href="https://cloud.google.com/docs/authentication/production#providing_credentials_to_your_application">Application Default Credentials (ADC)</a>:
 * ```
 * const datastore = new Datastore();
 *
 * ```
 * @example Create a client with <a href="https://cloud.google.com/docs/authentication/production#obtaining_and_providing_service_account_credentials_manually">explicit credentials</a>:
 * ```
 * const datastore = new Datastore({ projectId:
 * 'your-project-id', keyFilename: '/path/to/keyfile.json'
 * });
 *
 * ```
 * @example <caption>include:samples/quickstart.js</caption>
 * region_tag:datastore_quickstart
 * Full quickstart example:
 */
/**
 * @name Datastore.v1
 * @see v1.DatastoreClient
 * @type {object}
 * @property {constructor} DatastoreClient
 *     Reference to {@link v1.DatastoreClient}.
 */
/**
 * @name module:@google-cloud/datastore.v1
 * @see v1.DatastoreClient
 * @type {object}
 * @property {constructor} DatastoreClient
 *     Reference to {@link v1.DatastoreClient}.
 */
module.exports.v1 = gapic.v1;
const v1 = gapic.v1;
exports.v1 = v1;
var v1_1 = require("./v1");
Object.defineProperty(exports, "DatastoreClient", { enumerable: true, get: function () { return v1_1.DatastoreClient; } });
Object.defineProperty(exports, "DatastoreAdminClient", { enumerable: true, get: function () { return v1_1.DatastoreAdminClient; } });
//# sourceMappingURL=index.js.map