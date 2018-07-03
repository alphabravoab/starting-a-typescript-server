import { JsonController, Get, Param, Body, Post, HttpCode, Put, NotFoundError } from 'routing-controllers'
import User from './entity'

@JsonController()
export default class PageController {

    @Get('/users')
    async allPages() {
      const users = await User.find()
      return { users }
    }

    @Get('/users/:id')
    getPage(
    @Param('id') id: number
    ) {
        return User.findOne(id)
    }
      
    @Put('/users/:id')
    async updatePage(
    @Param('id') id: number,
    @Body() update: Partial<User>
    ) {
    const user = await User.findOne(id)
    if (!user) throw new NotFoundError('Cannot find user')

    return User.merge(user, update).save()
    }

    @Post('/users')
    @HttpCode(201)
    createPage(
      @Body() user: User
    ) {
      return user.save()
    }
}