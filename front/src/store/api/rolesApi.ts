import {api} from "./api.ts";
import {IServerResponse} from "../../types/responses.ts";
import {Role} from "../../types/Models/Role/model.ts";
import {IIdRequest} from "../../types/requests.ts";

const rolesApi = api.injectEndpoints({
   endpoints(builder) {
       return {
           getRoles: builder.query<IServerResponse<Role[]>, void>({
              query() {
                    return {
                        url: '/roles',
                        method: 'GET'
                    }
              }
           }),
           getRole: builder.query<IServerResponse<Role>, IIdRequest>({
                query(id) {
                    return {
                        url: `/roles/${id}`,
                        method: 'GET'
                    }
                }
           })
       }
   }
});

export const { useGetRolesQuery, useLazyGetRolesQuery, useGetRoleQuery } = rolesApi;