using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using QuotesMicroservice.Repository;
using QuotesMicroservice.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace QuotesMicroservice
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
			services.AddTransient<IQuotesRepo, QuotesRepo>();
			services.AddTransient<IQuotesService, QuotesService>();
			
			services.AddSwaggerGen(c =>
			{
				c.SwaggerDoc("v1", new OpenApiInfo { Title = "Quotes API", Version = "v1" });
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
			// Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
			// specifying the Swagger JSON endpoint.
			app.UseSwaggerUI(c =>
			{
				c.SwaggerEndpoint("/swagger/v1/swagger.json", "Quotes API V1");
			});
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
