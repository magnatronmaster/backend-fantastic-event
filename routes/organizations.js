const express = require('express');

//Services
const OrganizationService = require('../services/organization');

//Middleware
const validationHandler = require('../utils/middleware/validationHandler');
const multer = require('../utils/middleware/multer');

//Schemas
const {
  createOrganizationSchema,
  updateOrganizationSchema,
  idOrganizationShcema,
} = require('../utils/schemas/organization');
const { idUserShcema } = require('../utils/schemas/user');

function organizationApi(app) {
  const router = express.Router();

  app.use('/api/organization/', router);
  const organizationService = new OrganizationService();

  router.get(
    '/:id_org',
    validationHandler(idOrganizationShcema, 'params'),
    async (req, res, next) => {
      try {
        const { id_org } = req.params;
        const organization = await organizationService.getOrganization(id_org);
        res.status(200).json({
          data: organization,
          message: 'Organization listed',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.get(
    '/',
    validationHandler(idUserShcema, 'query'),
    async (req, res, next) => {
      const { id_user } = req.query;
      try {
        const organizations = await organizationService.getOrganizations({
          idUser: id_user,
        });
        res.status(200).json({
          data: organizations,
          message: 'Organizations listed',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/',
    multer.single(),
    validationHandler(createOrganizationSchema),
    async (req, res, next) => {
      const { body: organization } = req;
      try {
        const idOrg = await organizationService.createOrganization({
          organization,
        });
        if (idOrg.isBoom) next(idOrg);
        res.status(201).json({
          data: { idOrg },
          message: 'Organization created',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.patch(
    '/',
    multer.single(),
    validationHandler(updateOrganizationSchema),
    validationHandler(idOrganizationShcema, 'query'),
    async (req, res, next) => {
      const { id_org } = req.query;
      const { body: organization } = req;
      try {
        const updatedOrganization = await organizationService.updateOrganization(
          {
            organizationId: id_org,
            organization,
          }
        );
        res.status(201).json({
          data: updatedOrganization,
          message: 'Organization updated',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:id_org',
    validationHandler(idOrganizationShcema, 'params'),
    async (req, res, next) => {
      const { id_org } = req.params;
      try {
        const deletedOrganization = await organizationService.deleteOrganization(
          {
            organizationId: id_org,
          }
        );
        res.status(201).json({
          data: deletedOrganization,
          message: 'Organization deleted',
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = organizationApi;
