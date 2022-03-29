import { Request, Response } from 'express';
import * as Community from '../models/community.server.model';
import * as User from '../models/user.server.model';
import config from '../config/config.server.config';
import {
  isValidDocumentID,
  parseInteger,
  isAnyFieldValid,
  isAllFieldsValid,
} from '../lib/validate.lib';


export function communityCreate(req: Request, res: Response) {
  const authToken = req.get(config.get('authToken')),
    reqBody = req.body;

  // Set community fields to an object for passing to the model
  const communityParams = {
    userID: isValidDocumentID(reqBody.userID) ? reqBody.userID : false,
    name:
      reqBody.name.length && reqBody.name.length > 0 ? reqBody.name : false,
    description: reqBody.description || '',
    members: reqBody.members || 0,
    img: reqBody.img || '',
  };

  if (isAllFieldsValid(communityParams)) {
    User.isUserAuthorized(communityParams.userID, authToken, function (result) {
      if (result.isAuth) {
        // Insert new community to database
        Community.insertCommunity(communityParams, function (result) {
          if (result.err) {
            // Return the error message with the error status
            res.status(result.status).send(result.err);
          } else {
            // Return the community document object with 201 status
            res.status(201).json({ communityPostData: result });
          }
        });
      } else {
        if (result.err) {
          // Return the error message with the error status
          res.status(result.status).send(result.err);
        } else {
          res.status(401).send('Unauthorized');
        }
      }
    });
  } else {
    res.status(400).send('Bad request');
  }
}