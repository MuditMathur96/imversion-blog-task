import {ApolloServer} from '@apollo/server'
import {startStandaloneServer} from '@apollo/server/standalone';

import { PORT } from "../configs/config";
import prisma from '../infrastructure/database/prisma';
import typeDefs from '../graphql/typeDefs';
import PostResolver from '../graphql/resolvers';

//Start the server
/**
 * Start the graphql server using the PORT env variable
 * @returns url of the server or null if error
 */
export async function StartGqServer():Promise<string | null>{
    //Apollo Server instance
    try{
        const resolvers = new PostResolver(prisma);

        const server = new ApolloServer({
            typeDefs,
            resolvers:resolvers.getResolvers(),
            
        });
        const {url} = await startStandaloneServer(server,{
            listen:{port:PORT},
            context:async({req,res})=>({
                prisma // passing prisma client as context for resolvers
            })
        });
        console.info("Started the graphql server at: ",url);
    
        return url;
    }catch(err:any){
        console.error("Could not start the server")
        console.error(err);
        return null;
    }
}