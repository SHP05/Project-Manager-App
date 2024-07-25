// const { projects, clients } = require("../sampleData");
const { GraphQLObjectType , GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType } = require('graphql');

const client = require('../models/client');
const project = require('../models/project');

const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: {type: GraphQLID} ,
    name: {type: GraphQLString} , 
    email: {type: GraphQLString} ,
    phone: {type: GraphQLString} ,
  }),
});

const ProjectType = new GraphQLObjectType({
    name: "Project",
    fields: () => ({
      id: {type: GraphQLID} ,
      clientId: { type: GraphQLID },
      name: {type: GraphQLString} , 
      description: {type: GraphQLString},
      status: {type: GraphQLString} ,
      client: {
        type : ClientType,
        resolve(parent, args){
            return client.findById(parent.clientId)
        }
      }
    }),
  });

//Queries
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        clients : {
            type : new GraphQLList(ClientType),
            resolve(parent , args){
                return client.find();
            }
        },
        client : {
            type : ClientType,
            args : { id : { type : GraphQLID }},
            resolve(parent , args){
                return client.findById(args.id)
            }
        },
        projects : {
            type : new GraphQLList(ProjectType),
            resolve(parent , args){
                return project.find();
            }
        },
        project : {
            type : ProjectType,
            args : { id : { type : GraphQLID }},
            resolve(parent , args){
                return project.findById(args.id)
            }
        }

    }
})


// Mutation
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // Add client
        addClient: {
            type: ClientType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                phone: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent,args){
                const c = new client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone
                });
                return c.save();
            }
        },
        // Delete client
        deleteClient: {
            type: ClientType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID)}
            },
            async resolve(parent,args){
                try {
                    // Delete projects related to the client
                    await project.deleteMany({ clientId: args.id });
        
                    // Delete the client
                    return client.findByIdAndDelete(args.id);
                } catch (err) {
                    throw new Error(err.message);
                }
            }
        },
        //add Project
        addProject: {
            type: ProjectType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString)},
                description: { type: new GraphQLNonNull(GraphQLString)},
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatus',
                        values: { 
                            'new': { value: 'Not Started' },
                            'progress': { value: 'In Progress' },
                            'completed': { value: 'Completed' },
                        }
                    }),
                    defaultValue: "Not Started",
                },
                clientId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent,args){
                const P = new project({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId
                })

                return P.save();
            }
        },
        //delete project
        deleteProject: {
            type: ProjectType,
            args:{
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent,args){
                return project.findByIdAndDelete(args.id)
            }
        },
        //Update user
        updateProject: {
            type: ProjectType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString},
                description: { type: GraphQLString},
                status: {
                    type: new GraphQLEnumType({
                        name: "ProjectStatusUpdate",
                        values: { 
                            'new': { value: 'Not Started' },
                            'progress': { value: 'In Progress' },
                            'completed': { value: 'Completed' },
                        }
                    }),
                },
            },
            resolve(parent, args){
                return project.findByIdAndUpdate(
                    args.id,
                    {
                        $set:{
                            name: args.name,
                            description: args.description,
                            status: args.status
                        }
                    },
                    { new: true}
                )
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query : RootQuery,
    mutation
});