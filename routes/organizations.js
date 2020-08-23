const express = require('express');
const OrganizationService = require('../services/organization');

const organizationService = new OrganizationService();

function organizationApi(app) {
  const router = express.Router();
  app.use('/api/organization', router);

  router.get('/:organizationId', async(req, res) => {
    try {
      const { organizationId } = req.params;
      const organization = await organizationService.getOrganization({ organizationId });
      res.status(200).json({
        error: false,
        data: organization,
      });
    } catch (error) {
      console.log(error)
    }
  });

  router.get('/', async(req, res) => {
    try {
      const organizations = await organizationService.getOrganizations();
      res.status(200).json({
        error: false,
        data: organizations,
      });
    } catch (error) {
      console.log(error);
    }
  });

  router.post('/', async (req, res) => {
    const { body: organization } = req;
    try {
      const createdOrganization = await organizationService.createOrganization({
        organization,
      });
      res.status(201).json({
        error: false,
        data: createdOrganization,
      });
    } catch (error) {
      console.log(error);
    }
  });

  router.put('/:organizationId', async (req, res) => {
    const { organizationId } = req.params;
    const { body: organization } = req;
    try {
      const updatedOrganization = await organizationService.updateOrganization({
        organizationId,
        organization,
      });
      res.status(201).json({
        error: false,
        data: updatedOrganization,
      });
    } catch (error) {
      console.log(error);
    }
  });

  router.delete('/:organizationId', async (req, res) => {
    const { organizationId } = req.params;
    try {
      const deletedOrganization = await organizationService.deleteOrganization({
        organizationId
      });
      res.status(201).json({
        error: false,
        data: deletedOrganization,
      });
    } catch (error) {
      return error;
    }
  });
};

module.exports = organizationApi;
