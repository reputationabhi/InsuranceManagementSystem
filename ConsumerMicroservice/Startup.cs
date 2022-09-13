using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ConsumerMicroservice.Service;
using ConsumerMicroservice.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace ConsumerMicroservice
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddControllers();
			services.AddTransient<IConsumerService, ConsumerService>();
			services.AddTransient<IConsumerRepository, ConsumerRepository>();
			services.AddSwaggerGen(options =>
			{
				options.SwaggerDoc("v2", new Microsoft.OpenApi.Models.OpenApiInfo
				{
					Title = "Consumer MicroService",
				});
			});
			services.AddCors(options =>
			{
				options.AddDefaultPolicy(
					builder =>
					{
						builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
					});
			});
			services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
				 .AddJwtBearer(options =>
				 {
					 options.TokenValidationParameters = new TokenValidationParameters
					 {
						 ValidateIssuer = true,
						 ValidateAudience = false,
						 ValidateLifetime = true,
						 ValidateIssuerSigningKey = true,
						 ValidIssuer = "codepediainfo",
						 ValidAudience = "codepediainfo",
						 IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("This is my supper secret key for jwt")),
						 ClockSkew = TimeSpan.Zero
					 };
				 });
		}


		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			app.UseRouting();
			app.UseSwagger();
			app.UseSwaggerUI(options => options.SwaggerEndpoint("/swagger/v2/swagger.json", "Consumer MicroService"));

			app.UseCors();
			app.UseAuthentication();
			app.UseAuthorization();

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
			});
		}
	}
}
